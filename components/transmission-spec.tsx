import { RevealGroup } from "@/components/reveal/reveal-group";

const LINKEDIN_URL = "https://www.linkedin.com/in/derikschneider/";
const RESUME_PDF_PATH = "/resume/derik_schneider_resume.pdf";

// Every value here is read straight off app/api/contact/route.ts and
// contact-form.tsx's own `maxLength` props (IMPLEMENTATION.md step 5). If
// either of those ever changes, this panel goes stale first — fix the panel
// to match the implementation, not the other way around.
const SPEC_ROWS = [
  { key: "Endpoint", value: "POST /api/contact", detail: "A real Route Handler, not a form SaaS." },
  { key: "Transport", value: "AWS SES", detail: "SESv2Client sends straight to a verified inbox." },
  { key: "Spam", value: "Honeypot field", detail: "A hidden field bots fill and real users never see." },
  { key: "Limits", value: "200 & 5000 chars", detail: "Name and message length, enforced client- and server-side." },
  { key: "Storage", value: "None", detail: "Nothing is written to a database. The email is the only record." },
];

export function TransmissionSpec() {
  return (
    <RevealGroup className="flex flex-col border border-border">
      {SPEC_ROWS.map((row, i) => (
        <div key={row.key}>
          {i > 0 && <div className="hairline" data-reveal="line" />}
          <div className="grid grid-cols-[8ch_1fr] gap-x-3 p-4">
            <span className="font-mono text-[10.5px] tracking-[0.08em] text-fg-50 uppercase">
              <span data-reveal="text" data-reveal-size="fine">
                {row.key}
              </span>
            </span>
            <div className="flex flex-col gap-1">
              <span data-reveal="text" data-reveal-size="fine" className="font-mono text-sm text-primary">
                {row.value}
              </span>
              <p data-reveal="text" className="text-[0.8rem] leading-relaxed text-fg-75">
                {row.detail}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="hairline" data-reveal="line" />
      <div className="flex flex-wrap gap-x-5 gap-y-2 p-4">
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs tracking-widest text-fg-50 uppercase transition-colors hover:text-primary"
        >
          <span data-reveal="text" data-reveal-size="fine">
            LinkedIn →
          </span>
        </a>
        <a
          href={RESUME_PDF_PATH}
          download
          className="font-mono text-xs tracking-widest text-fg-50 uppercase transition-colors hover:text-primary"
        >
          <span data-reveal="text" data-reveal-size="fine">
            Resume PDF →
          </span>
        </a>
      </div>
    </RevealGroup>
  );
}
