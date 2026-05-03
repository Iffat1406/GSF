"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { TrendingUp, Coins, Calendar, Star, ChevronRight, ArrowUpRight, CheckCircle2, Clock, Users, Zap } from "lucide-react";
import Link from "next/link";

const STAGE_COLORS: Record<string, string> = {
  Ideation: "#8B5CF6", Screening: "#3B82F6", Research: "#06B6D4",
  MVP: "#10B981", Funding: "#F59E0B", Launch: "#EF4444", PMF: "#5B6CFF",
};

const MY_CONTRIBUTIONS = [
  {
    id: 1,
    ventureName: "EduLoop",
    founder: "Arjun Sharma",
    sector: "EdTech",
    avatar: "EL",
    avatarBg: "#8B5CF6",
    myRole: "Ideation Mentor",
    roleColor: "#8B5CF6",
    currentStage: "Research",
    stageSupported: "Ideation → Research",
    sessionsCompleted: 3,
    totalHours: 2.25,
    creditsEarned: 240,
    equityGranted: "2.5%",
    lastSession: "Apr 8, 2026",
    rating: 5.0,
    founderFeedback: "Incredible mentor — completely shifted how we think about our customer problem.",
    nextSession: "Apr 12, 2026",
    ventureProgress: 33,
    impact: ["Refined ICP", "Validated core hypothesis", "Intro to 2 investors"],
  },
  {
    id: 2,
    ventureName: "Supplify",
    founder: "Priya Mehta",
    sector: "FinTech",
    avatar: "SU",
    avatarBg: "#10B981",
    myRole: "MVP Reviewer",
    roleColor: "#10B981",
    currentStage: "MVP",
    stageSupported: "Research → MVP",
    sessionsCompleted: 5,
    totalHours: 4.5,
    creditsEarned: 400,
    equityGranted: "1%",
    lastSession: "Apr 6, 2026",
    rating: 4.8,
    founderFeedback: "Helped us cut scope by 60% and ship faster. Game changer.",
    nextSession: null,
    ventureProgress: 57,
    impact: ["Defined MVP feature set", "Identified 3 cut features", "Intro to beta users"],
  },
  {
    id: 3,
    ventureName: "HealthBridge",
    founder: "Rahul Kumar",
    sector: "HealthTech",
    avatar: "HB",
    avatarBg: "#EF4444",
    myRole: "Funding Advisor",
    roleColor: "#F59E0B",
    currentStage: "Funding",
    stageSupported: "MVP → Funding",
    sessionsCompleted: 8,
    totalHours: 7.0,
    creditsEarned: 640,
    equityGranted: "0.5%",
    lastSession: "Apr 2, 2026",
    rating: 4.9,
    founderFeedback: "Vikram helped us close our first angel cheque. Incredible network.",
    nextSession: "Apr 16, 2026",
    ventureProgress: 71,
    impact: ["Built pitch deck", "Intro to 5 angels", "Closed ₹28L pre-seed"],
  },
];

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: d, duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function ExpertContributionsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const totalCredits = MY_CONTRIBUTIONS.reduce((a, c) => a + c.creditsEarned, 0);
  const totalSessions = MY_CONTRIBUTIONS.reduce((a, c) => a + c.sessionsCompleted, 0);
  const totalHours = MY_CONTRIBUTIONS.reduce((a, c) => a + c.totalHours, 0);

  return (
    <DashboardShell role="expert">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-primary)" }}>
              My Contributions
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Ventures you&apos;ve mentored — your stage contributions, equity earned, and founder feedback.
            </p>
          </div>
          <Link href="/expert-dashboard/ventures" className="btn-primary text-sm py-2 px-5 flex items-center gap-1.5">
            <ArrowUpRight className="size-3.5" /> Browse More Ventures
          </Link>
        </motion.div>

        {/* Summary row */}
        <motion.div {...fadeUp(0.05)} className="grid grid-cols-3 gap-4">
          {[
            { label: "Ventures mentored", value: MY_CONTRIBUTIONS.length, icon: Users,      color: "#5B6CFF" },
            { label: "Sessions done",     value: totalSessions,           icon: Calendar,   color: "#4FD1C5" },
            { label: "Total credits",     value: totalCredits,            icon: Coins,      color: "#F59E0B" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="stat-card flex items-center gap-3">
              <div className="size-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15` }}>
                <Icon className="size-5" style={{ color }} />
              </div>
              <div>
                <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{value}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Venture cards */}
        <div className="space-y-4">
          {MY_CONTRIBUTIONS.map((v, i) => {
            const isExpanded = expandedId === v.id;
            const stageColor = STAGE_COLORS[v.currentStage] ?? "#5B6CFF";

            return (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="card overflow-hidden"
                style={isExpanded ? { border: `1.5px solid ${v.roleColor}40` } : {}}
              >
                {/* Header row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : v.id)}
                  className="w-full flex items-center gap-4 p-5 text-left transition-all"
                  style={{ backgroundColor: isExpanded ? `${v.roleColor}06` : "transparent" }}
                >
                  {/* Logo */}
                  <div className="size-12 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: v.avatarBg }}>
                    {v.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{v.ventureName}</span>
                      <span
                        className="badge text-[10px]"
                        style={{ backgroundColor: `${v.roleColor}15`, color: v.roleColor, border: `1px solid ${v.roleColor}30` }}
                      >
                        {v.myRole}
                      </span>
                      <span
                        className="badge text-[10px]"
                        style={{ backgroundColor: `${stageColor}15`, color: stageColor, border: `1px solid ${stageColor}30` }}
                      >
                        {v.currentStage}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {v.founder} · {v.sector} · {v.stageSupported}
                    </p>

                    {/* Mini progress */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 progress-bar" style={{ height: "4px" }}>
                        <div className="h-full rounded-full"
                          style={{ width: `${v.ventureProgress}%`, backgroundColor: stageColor }} />
                      </div>
                      <span className="text-[10px] flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                        {v.ventureProgress}% complete
                      </span>
                    </div>
                  </div>

                  {/* Right stats */}
                  <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-sm font-bold" style={{ color: "#4FD1C5" }}>+{v.creditsEarned} cr</span>
                    <span className="text-xs font-semibold" style={{ color: "#10B981" }}>{v.equityGranted} equity</span>
                    <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{v.sessionsCompleted} sessions</span>
                  </div>

                  <ChevronRight className="size-4 flex-shrink-0 transition-transform" style={{
                    color: "var(--text-muted)",
                    transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)"
                  }} />
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t"
                    style={{ borderTopColor: "var(--border-soft)" }}
                  >
                    <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {/* Impact */}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                          Your Impact
                        </p>
                        <div className="space-y-2">
                          {v.impact.map((imp, j) => (
                            <div key={j} className="flex items-center gap-2">
                              <CheckCircle2 className="size-4 text-emerald-500 flex-shrink-0" />
                              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{imp}</span>
                            </div>
                          ))}
                        </div>

                        {/* Session stats */}
                        <div className="grid grid-cols-3 gap-3 mt-4">
                          {[
                            { label: "Sessions",  value: v.sessionsCompleted, color: "#5B6CFF" },
                            { label: "Hours",     value: `${v.totalHours}h`,  color: "#4FD1C5" },
                            { label: "Equity",    value: v.equityGranted,     color: "#F59E0B" },
                          ].map(({ label, value, color }) => (
                            <div key={label} className="p-2.5 rounded-xl text-center"
                              style={{ backgroundColor: "var(--bg-surface-2)", border: "1px solid var(--border-soft)" }}>
                              <p className="text-sm font-bold" style={{ color }}>{value}</p>
                              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{label}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Feedback + next session */}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                          Founder Feedback
                        </p>
                        <div className="p-4 rounded-2xl mb-4"
                          style={{ backgroundColor: "var(--bg-surface-2)", border: "1px solid var(--border-soft)" }}>
                          <div className="flex items-center gap-1 mb-2">
                            {[1,2,3,4,5].map(s => (
                              <Star key={s} className={`size-3 ${s <= Math.floor(v.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                            ))}
                            <span className="text-xs font-medium ml-1" style={{ color: "var(--text-primary)" }}>{v.rating}</span>
                          </div>
                          <p className="text-sm italic" style={{ color: "var(--text-secondary)" }}>
                            "{v.founderFeedback}"
                          </p>
                          <p className="text-[10px] mt-2" style={{ color: "var(--text-muted)" }}>— {v.founder}</p>
                        </div>

                        {/* Next session or last */}
                        <div className="flex items-center gap-2 p-3 rounded-xl"
                          style={{ backgroundColor: v.nextSession ? "rgba(91,108,255,0.06)" : "var(--bg-surface-2)", border: "1px solid var(--border-soft)" }}>
                          {v.nextSession ? (
                            <>
                              <Calendar className="size-4 flex-shrink-0" style={{ color: "var(--accent-indigo)" }} />
                              <div>
                                <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>Next: {v.nextSession}</p>
                                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Session scheduled</p>
                              </div>
                              <button className="ml-auto text-xs font-medium" style={{ color: "var(--accent-indigo)" }}>
                                Join →
                              </button>
                            </>
                          ) : (
                            <>
                              <Clock className="size-4 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
                              <div>
                                <p className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                                  Last session: {v.lastSession}
                                </p>
                                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>No upcoming session</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Total equity summary */}
        <motion.div
          {...fadeUp(0.3)}
          className="p-6 rounded-3xl relative overflow-hidden"
          style={{ backgroundColor: "var(--bg-surface)", border: "1px solid rgba(79,209,197,0.35)" }}
        >
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[70px] pointer-events-none" style={{ background: "rgba(79,209,197,0.08)" }} />
          <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full blur-[50px] pointer-events-none" style={{ background: "rgba(91,108,255,0.06)" }} />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>Total Equity Accumulated</p>
              <p className="text-4xl font-extrabold" style={{ color: "#4FD1C5", fontFamily: "'Playfair Display', serif" }}>
                4.0%
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>across {MY_CONTRIBUTIONS.length} ventures · {totalHours}h mentored</p>
            </div>
            <div className="sm:ml-auto flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <Zap className="size-4 text-yellow-500" />
              <span>GSF Verified Expert since 2026</span>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardShell>
  );
}
