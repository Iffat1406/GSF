"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const STUDENT_TESTIMONIALS = [
  {
    name: "Ananya Sharma",
    role: "Explorer Track · Cohort 2",
    quote:
      "I came in with zero idea what a startup even was. GSF gave me the language, structure, and confidence to go from 'I want to build something' to actually speaking with 25 potential customers.",
    avatar: "A",
    color: "bg-primary-100 text-primary-600",
  },
  {
    name: "Rahul Mehta",
    role: "Builder Track · Cohort 1",
    quote:
      "The mentor sessions were game-changing. My idea went from a vague hunch to a validated hypothesis in 6 weeks. I now have 12 beta users and a waiting list.",
    avatar: "R",
    color: "bg-secondary-100 text-secondary-600",
  },
  {
    name: "Tanvi Joshi",
    role: "Builder Track · Cohort 2",
    quote:
      "The peer group was everything. We pushed each other, shared our failures openly, and celebrated wins together. I made my co-founder through this cohort.",
    avatar: "T",
    color: "bg-emerald-100 text-emerald-600",
  },
];

const MENTOR_TESTIMONIALS = [
  {
    name: "Kiran Dev",
    role: "SaaS Founder · GSF Mentor",
    quote:
      "The quality of GSF students is exceptional. They come prepared, ask sharp questions, and implement feedback fast. I've mentored 20+ students across three cohorts.",
    avatar: "K",
    color: "bg-violet-100 text-violet-600",
  },
  {
    name: "Divya Nair",
    role: "VC Analyst · GSF Mentor",
    quote:
      "GSF fills a real gap. Students here are serious, structured, and have done the foundational work before they come to sessions. Makes every call highly productive.",
    avatar: "D",
    color: "bg-rose-100 text-rose-600",
  },
];

function TestimonialCard({ quote, name, role, avatar, color }: {
  quote: string; name: string; role: string; avatar: string; color: string;
}) {
  return (
    <div className="bg-white border border-border rounded-2xl p-6 shadow-card space-y-4 h-full flex flex-col">
      <Quote className="size-5 text-primary-300 flex-shrink-0" />
      <p className="text-text-secondary text-sm leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className={`size-9 rounded-full ${color} flex items-center justify-center text-sm font-semibold`}>
          {avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">{name}</p>
          <p className="text-xs text-text-muted">{role}</p>
        </div>
      </div>
    </div>
  );
}

export function SocialProofSection() {
  return (
    <section className="section-padding bg-canvas">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-widest">
            From our community
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-semibold text-text-primary leading-tight tracking-tight">
            Real people. Real results.
          </h2>
        </motion.div>

        {/* Student testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-5">
            Students
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STUDENT_TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <TestimonialCard {...t} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mentor testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-5">
            Mentors
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
            {MENTOR_TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <TestimonialCard {...t} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
