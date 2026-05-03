"use client";

import { motion } from "framer-motion";
import { Map, Search, Network } from "lucide-react";
import { Card } from "@/components/ui/Card";

const PROBLEMS = [
  {
    icon: Map,
    title: "No roadmap",
    description:
      "Students have no structured path to follow. They start strong, hit confusion, and give up before validating anything.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Search,
    title: "No validation support",
    description:
      "Ideas stay inside notebooks. Without frameworks and feedback loops, most ideas never reach actual users or markets.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: Network,
    title: "No early-stage ecosystem",
    description:
      "The startup world feels far away. Without a community of builders, exploring is lonely and execution feels impossible.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export function ProblemSection() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-semibold text-text-primary leading-tight tracking-tight text-balance">
            Most students want to build.
            <br />
            <span className="text-text-secondary font-normal">Few know where to start.</span>
          </h2>
        </motion.div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEMS.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Card hover padding="lg" className="h-full">
                  <div
                    className={`inline-flex size-11 rounded-xl ${problem.bg} items-center justify-center mb-5`}
                  >
                    <Icon className={`size-5 ${problem.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {problem.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
