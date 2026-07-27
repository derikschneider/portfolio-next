import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact — Derik Schneider",
  description: "Get in touch with Derik Schneider.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-20 md:px-0">
      <div className="flex flex-col gap-3 border-b border-border pb-8">
        <span className="font-mono text-sm tracking-widest text-primary uppercase">
          Contact
        </span>
        <h1 className="font-display text-4xl font-light tracking-tight text-foreground sm:text-5xl">
          Get in touch
        </h1>
        <p className="max-w-[60ch] text-lg leading-relaxed font-light text-fg-80">
          Questions about this site, the stack behind it, or just want to say hello — this goes straight to me.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
