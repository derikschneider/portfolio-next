"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useHoverFx } from "@/components/reveal/use-hover-fx";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submitRef = useRef<HTMLButtonElement>(null);
  useHoverFx(submitRef);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMessage(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-md border border-dashed border-border p-6 text-center font-mono text-sm text-fg-60">
        Message sent — thanks for reaching out. I&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot — visually hidden, off the tab order, never filled by real users. */}
      <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="font-mono text-xs tracking-widest text-fg-50 uppercase">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            required
            maxLength={200}
            autoComplete="name"
            className="rounded-none border-0 border-b border-input bg-white px-2.5 focus-visible:border-primary focus-visible:ring-0 dark:bg-input/30"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="font-mono text-xs tracking-widest text-fg-50 uppercase">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-none border-0 border-b border-input bg-white px-2.5 focus-visible:border-primary focus-visible:ring-0 dark:bg-input/30"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message" className="font-mono text-xs tracking-widest text-fg-50 uppercase">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          className="rounded-none border-0 border-b border-input bg-white px-2.5 focus-visible:border-primary focus-visible:ring-0 dark:bg-input/30"
        />
      </div>

      {status === "error" && (
        <p className="rounded-md border border-dashed border-border bg-muted/50 p-3 font-mono text-sm text-muted-foreground">
          {errorMessage}
        </p>
      )}

      <Button
        ref={submitRef}
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="mt-2 self-start"
      >
        <span data-reveal="text" data-reveal-size="fine">
          {status === "submitting" ? "Sending…" : "Send message"}
        </span>
      </Button>
    </form>
  );
}
