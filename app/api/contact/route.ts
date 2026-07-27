import { NextResponse } from "next/server";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 5000;

export async function POST(request: Request) {
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

  if (typeof name !== "string" || name.trim().length < 1 || name.length > 200) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (typeof message !== "string" || message.trim().length < 1) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const fromEmail = process.env.SES_FROM_EMAIL;
  const toEmail = process.env.SES_TO_EMAIL;

  // SES identity verification hasn't happened yet (as of 2026-07-27) — see
  // portfolio-next/CLAUDE.md. Fail loudly and honestly rather than claiming
  // a message was sent when there's nowhere for it to go.
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
        FromEmailAddress: fromEmail,
        Destination: { ToAddresses: [toEmail] },
        ReplyToAddresses: [email],
        Content: {
          Simple: {
            Subject: { Data: `Portfolio contact form: ${name}` },
            Body: { Text: { Data: `From: ${name} <${email}>\n\n${message}` } },
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
