import type { Metadata } from "next";
import { FieldHeader } from "@/components/field/field-header";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact — Derik Schneider",
  description: "Get in touch with Derik Schneider.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col gap-4 px-6 py-16">
      <FieldHeader
        eyebrow="Contact //"
        title="Get in touch"
        description="Questions about this site, the stack behind it, or just want to say hello — this goes straight to me."
      />
      <ContactForm />
    </div>
  );
}
