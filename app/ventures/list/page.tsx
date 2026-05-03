"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useRouter } from "next/navigation";
import {
  Lightbulb, Building2, TrendingUp, Users, Globe, Link2, ChevronRight,
  ChevronLeft, CheckCircle2, Rocket, Briefcase, Plus, X, ArrowRight
} from "lucide-react";

const SECTORS = ["EdTech", "FinTech", "HealthTech", "AgriTech", "SaaS", "Consumer", "ClimaTech", "DeepTech", "Other"];
const STAGES  = ["Ideation", "Screening", "Research", "MVP", "Funding", "Launch"];
const EXPERT_TAGS = [
  "EdTech expert", "FinTech expert", "HealthTech expert", "AgriTech expert",
  "Legal & IP advisor", "Fundraising advisor", "Product mentor", "Growth advisor",
  "B2B SaaS mentor", "Impact investor", "Series A VC", "Angel investor",
  "Regulatory advisor", "GTM advisor", "UX advisor", "Technical co-founder",
  "Marketing mentor", "Operations advisor", "HR & culture advisor", "CFO mentor",
];

const STEPS = [
  { id: 1, label: "Basic Info",   icon: Briefcase },
  { id: 2, label: "The Idea",     icon: Lightbulb },
  { id: 3, label: "Traction",     icon: TrendingUp },
  { id: 4, label: "Looking For",  icon: Users },
];

type FormData = {
  name: string; tagline: string; sector: string; stage: string;
  problem: string; solution: string; market: string; usp: string;
  traction: string; teamSize: string; equity: string; fundingGoal: string; website: string;
  lookingFor: string[]; linkedin: string; pitchDeck: string;
};

const EMPTY: FormData = {
  name: "", tagline: "", sector: "", stage: "",
  problem: "", solution: "", market: "", usp: "",
  traction: "", teamSize: "", equity: "", fundingGoal: "", website: "",
  lookingFor: [], linkedin: "", pitchDeck: "",
};

export default function ListVenturePage() {
  const router = useRouter();
  const [step,     setStep]     = useState(1);
  const [form,     setForm]     = useState<FormData>(EMPTY);
  const [submitted,setSubmitted]= useState(false);
  const [customTag,setCustomTag]= useState("");

  const set = (key: keyof FormData, val: string) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const toggleTag = (tag: string) => {
    setForm(prev => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(tag)
        ? prev.lookingFor.filter(t => t !== tag)
        : [...prev.lookingFor, tag],
    }));
  };

  const addCustomTag = () => {
    const t = customTag.trim();
    if (t && !form.lookingFor.includes(t)) {
      setForm(prev => ({ ...prev, lookingFor: [...prev.lookingFor, t] }));
    }
    setCustomTag("");
  };

  const canProceed = () => {
    if (step === 1) return form.name && form.tagline && form.sector && form.stage;
    if (step === 2) return form.problem && form.solution && form.market;
    if (step === 3) return form.traction && form.teamSize;
    return form.lookingFor.length > 0;
  };

  const handleSubmit = () => {
    // Save to localStorage so ventures page can pick it up
    const existing = JSON.parse(localStorage.getItem("gsf_user_ventures") || "[]");
    const newVenture = {
      ...form,
      id: Date.now(),
      avatar: form.name.slice(0, 2).toUpperCase(),
      avatarBg: "#5B6CFF",
      founder: "You",
      submittedAt: new Date().toISOString(),
    };
    localStorage.setItem("gsf_user_ventures", JSON.stringify([...existing, newVenture]));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="pt-24 min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--bg-base)" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-10 max-w-lg w-full text-center"
          >
            <div className="size-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "linear-gradient(135deg, rgba(91,108,255,0.15), rgba(79,209,197,0.1))", border: "2px solid rgba(91,108,255,0.3)" }}>
              <CheckCircle2 className="size-10" style={{ color: "var(--accent-indigo)" }} />
            </div>
            <h1 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-primary)" }}>
              Your venture is live!
            </h1>
            <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>{form.name}</strong> has been listed on the GSF Venture Marketplace.
            </p>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Experts will review your listing and may reach out to express interest. You&apos;ll receive notifications in your dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => router.push("/ventures")} className="btn-primary flex-1 justify-center text-sm py-2.5">
                <Rocket className="size-4" /> View marketplace
              </button>
              <button onClick={() => router.push("/dashboard")} className="btn-outline flex-1 justify-center text-sm py-2.5">
                Go to dashboard
              </button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen pb-20" style={{ backgroundColor: "var(--bg-base)" }}>
        <div className="section-container max-w-2xl mx-auto py-10">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <span className="badge badge-blue mb-4">
              <Lightbulb className="size-3.5" /> List Your Venture
            </span>
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-primary)" }}>
              Share your startup with{" "}
              <em className="not-italic text-gradient-primary">GSF experts</em>
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Fill in the details below and get matched with mentors, advisors, and investors who specialise in your sector.
            </p>
          </motion.div>

          {/* Step indicator */}
          <div className="flex items-center mb-8">
            {STEPS.map((s, idx) => {
              const done    = step > s.id;
              const active  = step === s.id;
              const Icon    = s.icon;
              return (
                <div key={s.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="size-9 rounded-full flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: done ? "#10B981" : active ? "var(--accent-indigo)" : "var(--bg-surface-2)",
                        border: `2px solid ${done ? "#10B981" : active ? "var(--accent-indigo)" : "var(--border-default)"}`,
                        color: done || active ? "white" : "var(--text-muted)",
                      }}
                    >
                      {done ? <CheckCircle2 className="size-4" /> : <Icon className="size-4" />}
                    </div>
                    <span className="text-[10px] mt-1 font-medium hidden sm:block"
                      style={{ color: active ? "var(--accent-indigo)" : "var(--text-muted)" }}>
                      {s.label}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2 rounded transition-all"
                      style={{ backgroundColor: step > s.id ? "#10B981" : "var(--border-default)" }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
              className="card p-8"
            >
              {/* ── Step 1: Basic Info ── */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-lg font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>Basic Information</h2>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Tell us the fundamentals of your venture.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Venture Name *</label>
                    <input className="input" placeholder="e.g. EduLoop" value={form.name} onChange={e => set("name", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>One-line Tagline *</label>
                    <input className="input" placeholder="e.g. AI-powered peer learning for university students" value={form.tagline} onChange={e => set("tagline", e.target.value)} />
                    <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>{form.tagline.length}/100 characters</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Sector *</label>
                      <select className="input" value={form.sector} onChange={e => set("sector", e.target.value)}>
                        <option value="">Select sector</option>
                        {SECTORS.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Stage *</label>
                      <select className="input" value={form.stage} onChange={e => set("stage", e.target.value)}>
                        <option value="">Select stage</option>
                        {STAGES.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 2: The Idea ── */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-lg font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>Your Idea</h2>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Describe the problem, solution, and market.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Problem Statement *</label>
                    <textarea className="input min-h-[90px] resize-none" placeholder="What specific problem are you solving? Be concrete." value={form.problem} onChange={e => set("problem", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Your Solution *</label>
                    <textarea className="input min-h-[90px] resize-none" placeholder="How does your product/service solve it? What makes it different?" value={form.solution} onChange={e => set("solution", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Target Market *</label>
                    <input className="input" placeholder="e.g. University students in Tier-1 Indian cities, aged 18-24" value={form.market} onChange={e => set("market", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Unique Advantage (USP)</label>
                    <input className="input" placeholder="What's your unfair advantage or key differentiator?" value={form.usp} onChange={e => set("usp", e.target.value)} />
                  </div>
                </div>
              )}

              {/* ── Step 3: Traction & Resources ── */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-lg font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>Traction & Resources</h2>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Share your current progress and what you&apos;re looking to raise.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Current Traction *</label>
                    <textarea className="input min-h-[80px] resize-none" placeholder="e.g. 200 sign-ups, 3 pilot schools, ₹50K MRR, MVP live..." value={form.traction} onChange={e => set("traction", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Team Size *</label>
                      <select className="input" value={form.teamSize} onChange={e => set("teamSize", e.target.value)}>
                        <option value="">Select</option>
                        {["Solo founder", "2", "3", "4", "5", "6+"].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Equity Offered</label>
                      <input className="input" placeholder="e.g. 8%" value={form.equity} onChange={e => set("equity", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Funding Goal</label>
                    <input className="input" placeholder="e.g. $50K, ₹20L pre-seed" value={form.fundingGoal} onChange={e => set("fundingGoal", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Website (optional)</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4" style={{ color: "var(--text-muted)" }} />
                      <input className="input pl-9" placeholder="https://yourventure.com" value={form.website} onChange={e => set("website", e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 4: Looking For ── */}
              {step === 4 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-lg font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>What Are You Looking For?</h2>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Select the types of expert support you need. Select as many as apply.</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {EXPERT_TAGS.map(tag => (
                      <button key={tag} onClick={() => toggleTag(tag)}
                        className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${form.lookingFor.includes(tag) ? "text-white" : ""}`}
                        style={form.lookingFor.includes(tag)
                          ? { backgroundColor: "var(--accent-indigo)", borderColor: "var(--accent-indigo)", color: "white" }
                          : { backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-default)", color: "var(--text-secondary)" }
                        }>
                        {tag}
                      </button>
                    ))}
                  </div>

                  {/* Custom tag */}
                  <div className="flex gap-2">
                    <input className="input flex-1" placeholder="Add a custom need..." value={customTag} onChange={e => setCustomTag(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && addCustomTag()} />
                    <button onClick={addCustomTag} className="btn-outline px-3 py-2">
                      <Plus className="size-4" />
                    </button>
                  </div>

                  {form.lookingFor.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>Selected ({form.lookingFor.length}):</p>
                      <div className="flex flex-wrap gap-1.5">
                        {form.lookingFor.map(tag => (
                          <span key={tag} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full text-white"
                            style={{ backgroundColor: "var(--accent-indigo)" }}>
                            {tag}
                            <button onClick={() => toggleTag(tag)}><X className="size-3" /></button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t" style={{ borderTopColor: "var(--border-soft)" }}>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>LinkedIn URL (optional)</label>
                    <div className="relative">
                      <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4" style={{ color: "var(--text-muted)" }} />
                      <input className="input pl-9" placeholder="linkedin.com/in/yourprofile" value={form.linkedin} onChange={e => set("linkedin", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Pitch Deck URL (optional)</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4" style={{ color: "var(--text-muted)" }} />
                      <input className="input pl-9" placeholder="drive.google.com/your-deck" value={form.pitchDeck} onChange={e => set("pitchDeck", e.target.value)} />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className="btn-outline flex items-center gap-2 text-sm py-2 px-4"
              style={{ opacity: step === 1 ? 0.4 : 1 }}
            >
              <ChevronLeft className="size-4" /> Back
            </button>

            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Step {step} of {STEPS.length}</span>

            {step < STEPS.length ? (
              <button
                onClick={() => canProceed() && setStep(s => s + 1)}
                disabled={!canProceed()}
                className="btn-primary flex items-center gap-2 text-sm py-2 px-5"
                style={{ opacity: canProceed() ? 1 : 0.5 }}
              >
                Next <ChevronRight className="size-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="btn-primary flex items-center gap-2 text-sm py-2 px-6"
                style={{ opacity: canProceed() ? 1 : 0.5 }}
              >
                <Rocket className="size-4" /> List Venture <ArrowRight className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
