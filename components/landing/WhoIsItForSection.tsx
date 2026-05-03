"use client";

import { motion } from "framer-motion";
import { Compass, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const SEGMENTS = [
  {
    icon: Compass,
    title: "Exploring entrepreneurship",
    tag: "For Explorers",
    tagColor: "bg-primary-50 text-primary-600",
    description:
      "You're curious about startups but haven't committed to an idea yet. GSF gives you a safe space to explore, ask big questions, and discover where your interests meet real problems.",
    points: [
      "Structured exploration modules",
      "Problem identification workshops",
      "Peer learning circles",
      "No prior experience needed",
    ],
    cta: "Start exploring",
    href: "/programs/explorer",
    accentBorder: "border-primary-200",
    accentBg: "from-primary-50/50 to-transparent",
  },
  {
    icon: Lightbulb,
    title: "Already building ideas",
    tag: "For Builders",
    tagColor: "bg-secondary-50 text-secondary-600",
    description:
      "You have an idea (or a few) and want to test if they're real. GSF helps you validate faster through frameworks, mentor feedback, and a community of early-stage builders.",
    points: [
      "Idea validation frameworks",
      "Customer discovery tools",
      "1-on-1 mentor sessions",
      "Pitch-ready founder training",
    ],
    cta: "Start building",
    href: "/programs/builder",
    accentBorder: "border-secondary-200",
    accentBg: "from-secondary-50/50 to-transparent",
  },
];

export function WhoIsItForSection() {
  return (
    <section className="section-padding bg-canvas">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-widest">
            Who it&apos;s for
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-semibold text-text-primary leading-tight tracking-tight">
            Wherever you are, we meet you there.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SEGMENTS.map((seg, i) => {
            const Icon = seg.icon;
            return (
              <motion.div
                key={seg.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`relative overflow-hidden bg-white rounded-2xl border ${seg.accentBorder} shadow-card p-8`}
              >
                {/* Gradient bg */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${seg.accentBg} pointer-events-none`}
                />

                <div className="relative">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="size-12 rounded-xl bg-white border border-border shadow-soft-sm flex items-center justify-center">
                      <Icon className="size-5 text-text-primary" />
                    </div>
                    <div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${seg.tagColor}`}>
                        {seg.tag}
                      </span>
                      <h3 className="mt-2 text-xl font-semibold text-text-primary">
                        {seg.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-text-secondary leading-relaxed mb-6">
                    {seg.description}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {seg.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-sm text-text-secondary">
                        <div className="size-4 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <div className="size-1.5 rounded-full bg-primary-500" />
                        </div>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <Button variant="outline" size="lg" rightIcon={<ArrowRight className="size-4" />} asChild>
                    <Link href={seg.href}>{seg.cta}</Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
