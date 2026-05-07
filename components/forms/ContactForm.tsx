"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill out all fields before sending your message.");
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      toast.success("Message sent! We'll get back to you soon.");
      setForm(EMPTY_FORM);
    } catch {
      toast.error("Something went wrong while sending your message.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" id="contact-form" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1A2332] mb-1.5" htmlFor="contact-name">Name</label>
          <input id="contact-name" type="text" className="input" placeholder="Your name" value={form.name} onChange={(event) => updateField("name", event.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1A2332] mb-1.5" htmlFor="contact-email">Email</label>
          <input id="contact-email" type="email" className="input" placeholder="you@example.com" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1A2332] mb-1.5" htmlFor="contact-subject">Subject</label>
        <select id="contact-subject" className="input" value={form.subject} onChange={(event) => updateField("subject", event.target.value)}>
          <option value="">Select a topic...</option>
          <option>Program inquiry</option>
          <option>Join as an expert</option>
          <option>Partnership</option>
          <option>Investment inquiry</option>
          <option>Press inquiry</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1A2332] mb-1.5" htmlFor="contact-message">Message</label>
        <textarea id="contact-message" className="input textarea" placeholder="Tell us what's on your mind..." value={form.message} onChange={(event) => updateField("message", event.target.value)} />
      </div>
      <button id="contact-submit" type="submit" disabled={submitting} className="btn-primary w-full justify-center py-3">
        {submitting ? "Sending..." : <>Send message <ArrowRight className="size-4" /></>}
      </button>
    </form>
  );
}
