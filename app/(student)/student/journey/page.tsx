"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Clock, Lock, ChevronRight, PlayCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";

const MODULES = [
  {
    id: 1,
    title: "Problem Framing",
    description: "Learn to identify and articulate real problems worth solving.",
    duration: "45 mins",
    tasks: 4,
    done: 4,
    status: "complete",
    tasks_list: [
      "Watch: What is a startup problem?",
      "Exercise: Write 3 problem statements",
      "Read: Jobs to Be Done framework",
      "Submit: Your best problem statement",
    ],
  },
  {
    id: 2,
    title: "Customer Research",
    description: "Understand who your customer is and what they actually care about.",
    duration: "60 mins",
    tasks: 5,
    done: 5,
    status: "complete",
    tasks_list: [],
  },
  {
    id: 3,
    title: "Market Sizing",
    description: "Calculate TAM, SAM, and SOM for your chosen problem space.",
    duration: "40 mins",
    tasks: 3,
    done: 3,
    status: "complete",
    tasks_list: [],
  },
  {
    id: 4,
    title: "Idea Validation Frameworks",
    description: "Design experiments to test your startup hypothesis scientifically.",
    duration: "75 mins",
    tasks: 5,
    done: 3,
    status: "in-progress",
    tasks_list: [
      "Watch: The Lean Startup Method",
      "Exercise: Write your validation hypothesis",
      "Complete: Customer interview guide",
      "Task: Conduct 5 interviews",
      "Submit: Interview insights",
    ],
  },
  {
    id: 5,
    title: "Pitch Preparation",
    description: "Build a compelling founder narrative for your validated idea.",
    duration: "90 mins",
    tasks: 6,
    done: 0,
    status: "locked",
    tasks_list: [],
  },
  {
    id: 6,
    title: "Demo Day Readiness",
    description: "Prepare for your cohort demo day and external presentations.",
    duration: "60 mins",
    tasks: 4,
    done: 0,
    status: "locked",
    tasks_list: [],
  },
];

export default function JourneyPage() {
  const overallProgress = Math.round(
    (MODULES.reduce((acc, m) => acc + m.done, 0) /
      MODULES.reduce((acc, m) => acc + m.tasks, 0)) *
      100
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h1 className="text-2xl font-semibold text-text-primary">My Journey</h1>
        <p className="text-text-secondary">Track your cohort progress module by module.</p>
      </motion.div>

      {/* Overall progress */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card padding="lg">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-sm font-semibold text-text-primary">Explorer Track — Cohort 2</p>
              <p className="text-xs text-text-muted">Modules 1-6 · 6 weeks</p>
            </div>
            <Badge variant="primary">{overallProgress}% complete</Badge>
          </div>
          <Progress value={overallProgress} size="lg" variant="primary" showValue />
          <div className="flex items-center gap-6 mt-4">
            {[
              { label: "Done", value: MODULES.filter((m) => m.status === "complete").length, color: "text-emerald-600" },
              { label: "In Progress", value: 1, color: "text-primary-600" },
              { label: "Locked", value: MODULES.filter((m) => m.status === "locked").length, color: "text-text-muted" },
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center">
                <p className={`text-xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-text-muted">{label}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Module list */}
      <div className="space-y-3">
        {MODULES.map((module, i) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <Card
              padding="lg"
              className={module.status === "locked" ? "opacity-60" : ""}
            >
              <div className="flex items-start gap-4">
                {/* Status icon */}
                <div className="flex-shrink-0 mt-0.5">
                  {module.status === "complete" ? (
                    <CheckCircle2 className="size-6 text-emerald-500" />
                  ) : module.status === "in-progress" ? (
                    <div className="size-6 rounded-full border-2 border-primary-500 bg-primary-100 flex items-center justify-center">
                      <div className="size-2 rounded-full bg-primary-500" />
                    </div>
                  ) : (
                    <Lock className="size-6 text-text-muted" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-text-primary">
                      Module {module.id}: {module.title}
                    </h3>
                    <Badge
                      variant={
                        module.status === "complete"
                          ? "success"
                          : module.status === "in-progress"
                          ? "primary"
                          : "gray"
                      }
                      size="sm"
                    >
                      {module.status === "complete"
                        ? "Complete"
                        : module.status === "in-progress"
                        ? "In Progress"
                        : "Locked"}
                    </Badge>
                  </div>
                  <p className="text-sm text-text-secondary mt-1">{module.description}</p>

                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-text-muted flex items-center gap-1">
                      <Clock className="size-3" /> {module.duration}
                    </span>
                    <span className="text-xs text-text-muted flex items-center gap-1">
                      <BookOpen className="size-3" /> {module.done}/{module.tasks} tasks
                    </span>
                  </div>

                  {module.status === "in-progress" && (
                    <div className="mt-3">
                      <Progress value={Math.round((module.done / module.tasks) * 100)} size="sm" />
                      <ul className="mt-3 space-y-1.5">
                        {module.tasks_list.map((task, ti) => (
                          <li key={ti} className="flex items-center gap-2 text-xs text-text-secondary">
                            {ti < module.done ? (
                              <CheckCircle2 className="size-3.5 text-emerald-500 flex-shrink-0" />
                            ) : (
                              <div className="size-3.5 rounded-full border border-gray-300 flex-shrink-0" />
                            )}
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {module.status !== "locked" && (
                  <Button
                    variant={module.status === "in-progress" ? "primary" : "outline"}
                    size="sm"
                    rightIcon={<ChevronRight className="size-3.5" />}
                    className="flex-shrink-0"
                  >
                    {module.status === "complete" ? "Review" : "Continue"}
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
