"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock, Zap, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function FinalCTASection() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-primary-500 px-8 py-16 sm:py-20 text-center"
        >
          {/* Subtle pattern */}
          <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />
          {/* Glow blobs */}
          <div className="absolute top-0 left-1/4 size-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 size-64 bg-secondary-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-tight text-balance">
              Start your founder journey the right way.
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Applications for Cohort 3 are open. Limited spots available — join a community
              of students serious about building something real.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="secondary"
                size="xl"
                rightIcon={<ArrowRight className="size-4" />}
                className="bg-white text-primary-600 hover:bg-white/95 shadow-soft"
                asChild
              >
                <Link href="/sign-up">Apply to next cohort</Link>
              </Button>
              <Button
                variant="ghost"
                size="xl"
                className="text-white/90 hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/programs">Learn more</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              {[
                { icon: Lock, label: "No credit card required" },
                { icon: Zap, label: "6-week structured cohort" },
                { icon: MessageSquare, label: "Expert mentor access" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-sm text-white/70">
                  <Icon className="size-3.5 text-white/50" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
