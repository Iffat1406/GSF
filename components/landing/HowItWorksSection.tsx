"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    step: "01",
    title: "Join a cohort",
    description:
      "Apply and get matched to a cohort based on your startup stage. Meet your peer group and mentor before day one.",
    color: "bg-primary-500",
    light: "bg-primary-50",
    text: "text-primary-600",
  },
  {
    step: "02",
    title: "Build clarity",
    description:
      "Work through structured modules on problem framing, market thinking, and customer understanding. Stop guessing — start learning.",
    color: "bg-secondary-400",
    light: "bg-secondary-50",
    text: "text-secondary-600",
  },
  {
    step: "03",
    title: "Validate ideas",
    description:
      "Use GSF's idea validation workspace to document hypotheses, run experiments, and collect real feedback from potential users.",
    color: "bg-violet-500",
    light: "bg-violet-50",
    text: "text-violet-600",
  },
  {
    step: "04",
    title: "Launch confidently",
    description:
      "Emerge with a validated idea, founder mindset, mentor relationships, and a peer network that lasts beyond the cohort.",
    color: "bg-emerald-500",
    light: "bg-emerald-50",
    text: "text-emerald-600",
  },
];

export function HowItWorksSection() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-widest">
            How it works
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-semibold text-text-primary leading-tight tracking-tight">
            Your 6-week founder journey
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            A proven, structured path that takes you from curious to confident.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-border z-0 mx-[12.5%]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                {/* Circle */}
                <div
                  className={`size-16 rounded-full ${step.color} flex items-center justify-center mb-6 shadow-soft`}
                >
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>

                {/* Content */}
                <div className={`px-4 py-4 rounded-xl ${step.light} w-full`}>
                  <h3 className={`text-base font-semibold ${step.text} mb-2`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
