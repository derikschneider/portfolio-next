import { NextResponse } from "next/server";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254; // RFC 5321 practical max
const MAX_MESSAGE_LENGTH = 5000;

// C0 control chars minus \t\n\r, plus DEL — never legitimate in this form's
// input and stripped defensively before the values reach SES/email headers.
const CONTROL_CHARS_RE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

// Best-effort in-memory rate limit, scoped to whatever Lambda container is
// currently warm — resets on cold start and isn't shared across concurrent
// instances, so this is a speed bump against casual bot floods, not a hard
// guarantee. Acceptable here because the blast radius is already small: SES
// stays in sandbox mode on purpose, so the only possible recipient is
// Derik's own verified inbox — there's no way to abuse this to spam anyone
// else, only to annoy him, which this limit is enough to blunt.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests — please try again later." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message, company } = body as Record<string, unknown>;

  // Honeypot: a hidden field real users never fill in. Bots that blindly
  // fill every field trip it; pretend success so they don't learn to skip it.
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (typeof name !== "string" || name.trim().length < 1 || name.length > MAX_NAME_LENGTH) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  // Name feeds straight into the email Subject header — reject anything
  // containing a line break or other control character rather than
  // stripping it, since a legitimate name never needs one and SES's exact
  // handling of raw CR/LF in a header value isn't something to rely on.
  if (CONTROL_CHARS_RE.test(name) || /[\r\n]/.test(name)) {
    return NextResponse.json({ error: "Name contains invalid characters." }, { status: 400 });
  }
  if (
    typeof email !== "string" ||
    email.length > MAX_EMAIL_LENGTH ||
    !EMAIL_RE.test(email)
  ) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (typeof message !== "string" || message.trim().length < 1) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }
  // Message is free text and legitimately multi-line, so \n/\r survive —
  // only strip other control characters (e.g. an embedded NUL byte).
  const cleanMessage = message.replace(CONTROL_CHARS_RE, "");

  const fromEmail = process.env.SES_FROM_EMAIL;
  const toEmail = process.env.SES_TO_EMAIL;

  // If these are missing, either SES setup isn't done or amplify.yml isn't
  // forwarding them into .env.production for the runtime — see that file's
  // comment for why app/branch env vars alone aren't enough on Amplify's
  // WEB_COMPUTE platform. Fail loudly and honestly either way rather than
  // claiming a message was sent when there's nowhere for it to go.
  if (!fromEmail || !toEmail) {
    return NextResponse.json(
      { error: "The contact form isn't connected to email delivery yet — please check back soon." },
      { status: 503 }
    );
  }

  const ses = new SESv2Client({ region: process.env.AWS_REGION ?? "us-east-1" });

  try {
    await ses.send(
      new SendEmailCommand({
        // A bare address (no display name) reads more like an automated
        // system than a person, which nudges Gmail's classifier toward
        // Promotions — this is one of the few signals actually controllable
        // from email content/headers alone. RFC 5322 "Display Name" <addr>
        // format is standard for SES's FromEmailAddress.
        FromEmailAddress: `"Derik Schneider" <${fromEmail}>`,
        Destination: { ToAddresses: [toEmail] },
        ReplyToAddresses: [email],
        Content: {
          Simple: {
            // Charset is technically optional (SES defaults to UTF-8), but
            // that default didn't hold up in practice — an em dash in a
            // test name rendered as "�" until this was made explicit.
            //
            // Subject/body phrasing is also deliberate: "Portfolio contact
            // form: X" and a leading "From: X <Y>" line both read like an
            // auto-generated form dump, another Promotions-tab signal.
            // Neither guarantees Primary-tab placement — that's mostly
            // sender-history reputation, which only builds over time — but
            // both are real, controllable levers.
            Subject: { Data: `New message from ${name}`, Charset: "UTF-8" },
            Body: {
              Text: {
                Data: `${cleanMessage}\n\n—\n${name} (${email})`,
                Charset: "UTF-8",
              },
            },
          },
        },
      })
    );
  } catch (err) {
    console.error("SES send failed:", err);
    return NextResponse.json({ error: "Something went wrong sending your message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
