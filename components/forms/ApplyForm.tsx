"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  role: string;
  idea: string;
};

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  university: "",
  role: "",
  idea: "",
};

export function ApplyForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.firstName || !form.lastName || !form.email || !form.university || !form.role) {
      toast.error("Please complete the required fields before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      toast.success("Application submitted! We will be in touch soon.");
      setForm(EMPTY_FORM);
    } catch {
      toast.error("Something went wrong while submitting your application.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" id="apply-form" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1A2332] mb-1.5" htmlFor="apply-firstname">First name</label>
          <input id="apply-firstname" type="text" className="input" placeholder="Aryan" value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1A2332] mb-1.5" htmlFor="apply-lastname">Last name</label>
          <input id="apply-lastname" type="text" className="input" placeholder="Kapoor" value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1A2332] mb-1.5" htmlFor="apply-email">University email</label>
        <input id="apply-email" type="email" className="input" placeholder="you@university.edu" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1A2332] mb-1.5" htmlFor="apply-university">University / College</label>
        <input id="apply-university" type="text" className="input" placeholder="IIT Delhi, BITS Pilani..." value={form.university} onChange={(event) => updateField("university", event.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1A2332] mb-1.5" htmlFor="apply-role">I am a...</label>
        <select id="apply-role" className="input" value={form.role} onChange={(event) => updateField("role", event.target.value)}>
          <option value="">Select your current role</option>
          <option>Undergraduate student</option>
          <option>Postgraduate student</option>
          <option>Recent graduate (within 2 years)</option>
          <option>First-time founder</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1A2332] mb-1.5" htmlFor="apply-idea">Do you have a startup idea? (optional)</label>
        <textarea id="apply-idea" className="input textarea" style={{ minHeight: "88px" }} placeholder="Briefly describe your idea or the problem you want to solve..." value={form.idea} onChange={(event) => updateField("idea", event.target.value)} />
      </div>
      <button id="apply-submit" type="submit" disabled={submitting} className="btn-primary w-full justify-center py-3 text-sm">
        {submitting ? "Submitting..." : <>Join GSF Free - 30 Days Access <ArrowRight className="size-4" /></>}
      </button>
      <p className="text-xs text-[#8A95A3] text-center">
        No credit card required. Cancel anytime after trial.
      </p>
    </form>
  );
}
