"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock, Compass, Zap, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const TRACKS = [
  {
    name: "Explorer Track",
    slug: "explorer",
    tagline: "Start your founder journey with curiosity.",
    description:
      "A 4-week intro to startup thinking. Learn how to identify real problems, conduct user interviews, and build a founder's mindset from scratch.",
    modules: 4,
    duration: "4 weeks",
    level: "Beginner",
    icon: Compass,
    iconColor: "text-[#3D74A0]",
    iconBg: "bg-[#EEF4F9]",
    features: ["Problem framing", "User empathy", "Market sizing basics", "Weekly peer circles"],
    accent: "border-l-primary-500",
    badgeVariant: "primary" as const,
    comingSoon: false,
  },
  {
    name: "Builder Track",
    slug: "builder",
    tagline: "Validate your idea before building.",
    description:
      "A 6-week deep dive into idea validation. Build customer personas, run experiments, and get mentor feedback on your startup hypothesis.",
    modules: 6,
    duration: "6 weeks",
    level: "Intermediate",
    icon: Zap,
    iconColor: "text-[#5B4A3A]",
    iconBg: "bg-[#F3E3D0]",
    features: ["Idea validation workspace", "Customer persona builder", "Mentor 1-on-1s", "Pitch preparation"],
    accent: "border-l-secondary-400",
    badgeVariant: "secondary" as const,
    comingSoon: false,
  },
  {
    name: "Founder Track",
    slug: "founder",
    tagline: "Launch with a validated product and team.",
    description:
      "An intensive 8-week program for founders ready to move fast. Access fundraising prep, co-founder matching, and GSF's VC network.",
    modules: 8,
    duration: "8 weeks",
    level: "Advanced",
    icon: Rocket,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    features: ["Fundraising prep", "Co-founder matching", "VC introductions", "Demo day"],
    accent: "border-l-violet-400",
    badgeVariant: "gray" as const,
    comingSoon: true,
  },
];

export function ProgramTracksSection() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-widest">
            Program Tracks
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-semibold text-text-primary leading-tight tracking-tight">
            Choose your track
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Three tracks designed for where you are — not where you wish you were.
          </p>
        </motion.div>

        <div className="space-y-5">
          {TRACKS.map((track, i) => {
            const Icon = track.icon;
            return (
              <motion.div
                key={track.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className={`relative bg-white rounded-2xl border border-border shadow-card border-l-4 ${track.accent} p-6 sm:p-8 ${track.comingSoon ? "opacity-70" : ""}`}
              >
                {track.comingSoon && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full">
                    <Lock className="size-3 text-gray-500" />
                    <span className="text-xs font-medium text-gray-500">Coming Soon</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className={`size-14 rounded-2xl ${track.iconBg} border border-border flex items-center justify-center`}>
                      <Icon className={`size-7 ${track.iconColor}`} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-text-primary">{track.name}</h3>
                      <Badge variant={track.badgeVariant}>{track.level}</Badge>
                      <Badge variant="gray">{track.duration}</Badge>
                      <Badge variant="gray">{track.modules} modules</Badge>
                    </div>
                    <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                      {track.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {track.features.map((f) => (
                        <span key={f} className="text-xs px-2.5 py-1 bg-canvas border border-border rounded-full text-text-secondary">
                          {f}
                        </span>
                      ))}
                    </div>
                    {!track.comingSoon && (
                      <Button variant="outline" size="md" rightIcon={<ArrowRight className="size-4" />} asChild>
                        <Link href={`/programs/${track.slug}`}>Learn more</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
