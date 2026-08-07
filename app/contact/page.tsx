import type { Metadata } from "next";
import { FieldHeader } from "@/components/field/field-header";
import { ContactForm } from "@/components/contact-form";
import { TransmissionSpec } from "@/components/transmission-spec";

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
        description="This form sends a real email. No third-party widget, no mailto, no inbox I forget to check."
      />
      <div className="grid grid-cols-1 gap-x-[72px] gap-y-10 lg:grid-cols-[1fr_400px] lg:items-start">
        {/* Matches the 62ch measure FieldHeader gives its description, so the
            form lines up with the copy above it instead of running the full
            column width. */}
        <div className="max-w-[62ch]">
          <ContactForm />
        </div>
        <TransmissionSpec />
      </div>
    </div>
  );
}
