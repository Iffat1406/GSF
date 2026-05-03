"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { CheckCircle2, Target, Clock, Lock, ChevronDown, ChevronUp, Zap } from "lucide-react";

const STAGES = [
  {
    id: "ideation",
    label: "Ideation",
    color: "#8B5CF6",
    status: "complete" as const,
    percent: 100,
    description: "Define the problem, identify the target audience, and validate the core hypothesis.",
    tasks: [
      { label: "Identify core problem", done: true },
      { label: "Define target customer", done: true },
      { label: "Write problem statement", done: true },
      { label: "Initial market size estimate", done: true },
    ],
  },
  {
    id: "screening",
    label: "Screening",
    color: "#3B82F6",
    status: "complete" as const,
    percent: 100,
    description: "Rapid assumption testing, competitor landscape, and initial mentor review.",
    tasks: [
      { label: "List top 3 assumptions", done: true },
      { label: "Competitor analysis (5 players)", done: true },
      { label: "Mentor screening call", done: true },
      { label: "GSF screening score ≥ 60", done: true },
    ],
  },
  {
    id: "research",
    label: "Research",
    color: "#06B6D4",
    status: "active" as const,
    percent: 55,
    description: "Deep customer discovery — interviews, surveys, and evidence collection.",
    tasks: [
      { label: "10 customer discovery interviews", done: true },
      { label: "Survey (50+ responses)", done: true },
      { label: "Create evidence board", done: false },
      { label: "Finalize ICP (ideal customer profile)", done: false },
      { label: "Research summary report", done: false },
    ],
  },
  {
    id: "mvp",
    label: "MVP",
    color: "#10B981",
    status: "locked" as const,
    percent: 0,
    description: "Build and test a minimal viable product with real users.",
    tasks: [
      { label: "Define MVP feature set", done: false },
      { label: "Build working prototype", done: false },
      { label: "100 beta users tested", done: false },
      { label: "Collect feedback & iterate", done: false },
    ],
  },
  {
    id: "funding",
    label: "Funding",
    color: "#F59E0B",
    status: "locked" as const,
    percent: 0,
    description: "Prepare for fundraising — pitch deck, financials, and investor outreach.",
    tasks: [
      { label: "Create investor pitch deck", done: false },
      { label: "Build financial projections (18 months)", done: false },
      { label: "Reach out to 20 angels", done: false },
      { label: "Close pre-seed round", done: false },
    ],
  },
  {
    id: "launch",
    label: "Launch",
    color: "#EF4444",
    status: "locked" as const,
    percent: 0,
    description: "Public launch — marketing, distribution, and growth engine activation.",
    tasks: [
      { label: "Launch marketing campaign", done: false },
      { label: "500 active users post-launch", done: false },
      { label: "Press / media coverage", done: false },
      { label: "Launch on Product Hunt", done: false },
    ],
  },
  {
    id: "pmf",
    label: "PMF",
    color: "#5B6CFF",
    status: "locked" as const,
    percent: 0,
    description: "Achieve product-market fit — retention, NPS, and repeatable growth.",
    tasks: [
      { label: "NPS score ≥ 50", done: false },
      { label: "Monthly retention > 60%", done: false },
      { label: "Organic referral rate > 20%", done: false },
      { label: "Revenue growing MoM", done: false },
    ],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function ProgressTrackerPage() {
  const [expanded, setExpanded] = useState<string>("research");
  const currentStageIndex = STAGES.findIndex(s => s.status === "active");
  const overallPercent = Math.round(
    STAGES.reduce((acc, s) => acc + s.percent, 0) / STAGES.length
  );

  return (
    <DashboardShell role="founder">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <motion.div {...fadeUp(0)}>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-primary)" }}>
            Progress Tracker
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Your 7-stage founder journey. Complete all tasks in each stage to unlock the next.
          </p>
        </motion.div>

        {/* Overall progress */}
        <motion.div {...fadeUp(0.05)} className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                Overall Journey Progress
              </p>
              <p className="text-3xl font-extrabold" style={{ color: "var(--accent-indigo)", fontFamily: "'Playfair Display', serif" }}>
                {overallPercent}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                Stage {currentStageIndex + 1} of {STAGES.length}
              </p>
              <span className="badge badge-blue text-xs">{STAGES[currentStageIndex]?.label}</span>
            </div>
          </div>
          <div className="progress-bar" style={{ height: "8px" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(to right, #5B6CFF, #4FD1C5)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${overallPercent}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {STAGES.map((s) => (
              <div key={s.id} className="size-2 rounded-full" style={{
                backgroundColor: s.status === "complete" ? "#10B981" : s.status === "active" ? s.color : "var(--border-default)"
              }} />
            ))}
          </div>
        </motion.div>

        {/* Stage list */}
        <div className="space-y-3">
          {STAGES.map((stage, i) => {
            const isExpanded = expanded === stage.id;
            const doneTasks = stage.tasks.filter(t => t.done).length;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                className="card overflow-hidden"
                style={stage.status === "active" ? { border: `1.5px solid ${stage.color}40` } : {}}
              >
                <button
                  onClick={() => setExpanded(isExpanded ? "" : stage.id)}
                  className="w-full flex items-center gap-4 p-4 text-left transition-all"
                  style={{ backgroundColor: isExpanded ? `${stage.color}06` : "transparent" }}
                >
                  {/* Status icon */}
                  <div className="size-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                    backgroundColor: stage.status === "complete" ? "rgba(16,185,129,0.12)"
                      : stage.status === "active" ? `${stage.color}18`
                      : "var(--bg-surface-2)"
                  }}>
                    {stage.status === "complete" ? (
                      <CheckCircle2 className="size-5 text-emerald-500" />
                    ) : stage.status === "active" ? (
                      <Target className="size-5" style={{ color: stage.color }} />
                    ) : (
                      <Lock className="size-5" style={{ color: "var(--text-muted)" }} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        Stage {i + 1}: {stage.label}
                      </span>
                      {stage.status === "active" && (
                        <span className="badge text-[10px]" style={{ backgroundColor: `${stage.color}15`, color: stage.color, border: `1px solid ${stage.color}30` }}>
                          Current
                        </span>
                      )}
                      {stage.status === "locked" && (
                        <span className="badge badge-warm text-[10px]">Locked</span>
                      )}
                    </div>

                    {/* Mini progress */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 progress-bar" style={{ height: "4px" }}>
                        <div className="h-full rounded-full" style={{
                          width: `${stage.percent}%`,
                          backgroundColor: stage.status === "complete" ? "#10B981" : stage.color
                        }} />
                      </div>
                      <span className="text-[10px] font-medium flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                        {doneTasks}/{stage.tasks.length} tasks
                      </span>
                    </div>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="size-4 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
                  ) : (
                    <ChevronDown className="size-4 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
                  )}
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t" style={{ borderTopColor: "var(--border-soft)" }}>
                    <p className="text-sm mt-4 mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {stage.description}
                    </p>
                    <div className="space-y-2">
                      {stage.tasks.map((task, ti) => (
                        <div key={ti} className="flex items-center gap-3 p-2.5 rounded-xl"
                          style={{ backgroundColor: task.done ? "rgba(16,185,129,0.06)" : "var(--bg-surface-2)" }}>
                          <div className={`size-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            task.done ? "bg-emerald-500" : "border-2"
                          }`} style={!task.done ? { borderColor: "var(--border-default)" } : {}}>
                            {task.done && <CheckCircle2 className="size-3.5 text-white" />}
                          </div>
                          <span className="text-sm" style={{
                            color: task.done ? "var(--text-secondary)" : "var(--text-primary)",
                            textDecoration: task.done ? "line-through" : "none"
                          }}>
                            {task.label}
                          </span>
                          {task.done && <span className="ml-auto text-[10px] text-emerald-500 font-medium">Done</span>}
                        </div>
                      ))}
                    </div>
                    {stage.status === "locked" && (
                      <p className="mt-3 text-xs text-center flex items-center justify-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                        <Lock className="size-3.5" /> Complete all tasks in the previous stage to unlock this stage.
                      </p>
                    )}
                    {stage.status === "active" && (
                      <div className="mt-4 p-3 rounded-xl flex items-center gap-2" style={{ backgroundColor: `${stage.color}10`, border: `1px solid ${stage.color}25` }}>
                        <Zap className="size-4 flex-shrink-0" style={{ color: stage.color }} />
                        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                          <strong>Tip:</strong> Book an expert session to fast-track your Research stage completion.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}
