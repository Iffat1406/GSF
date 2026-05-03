"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  User,
  CheckSquare,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  Circle,
  Save,
  Send,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "problem", label: "Problem Clarity", icon: Lightbulb },
  { id: "persona", label: "Customer Persona", icon: User },
  { id: "checklist", label: "Validation Checklist", icon: CheckSquare },
  { id: "feedback", label: "Feedback Panel", icon: MessageSquare },
];

const VALIDATION_ITEMS = [
  { id: 1, label: "Problem is clearly defined", done: true },
  { id: 2, label: "Target customer segment identified", done: true },
  { id: 3, label: "Conducted 10+ customer interviews", done: false },
  { id: 4, label: "Identified top 3 pain points", done: true },
  { id: 5, label: "Tested solution hypothesis", done: false },
  { id: 6, label: "Measured willingness to pay", done: false },
  { id: 7, label: "Identified existing alternatives", done: true },
  { id: 8, label: "Calculated market size estimate", done: false },
];

export default function IdeaPage() {
  const [activeTab, setActiveTab] = useState("problem");
  const [items, setItems] = useState(VALIDATION_ITEMS);
  const [saved, setSaved] = useState(false);

  const completed = items.filter((i) => i.done).length;
  const score = Math.round((completed / items.length) * 100);

  function toggleItem(id: number) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">My Idea</h1>
          <p className="text-text-secondary mt-1">
            Build and validate your startup idea systematically.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="warning" dot>Validating</Badge>
          <Button
            variant="primary"
            size="md"
            leftIcon={<Save className="size-4" />}
            onClick={handleSave}
          >
            {saved ? "Saved!" : "Save progress"}
          </Button>
        </div>
      </div>

      {/* Overall score */}
      <Card padding="md">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <Progress
              label="Validation Score"
              value={score}
              showValue
              sublabel={`${completed} of ${items.length} validation criteria met`}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-text-primary">{score}%</div>
            <Badge variant={score >= 70 ? "success" : score >= 40 ? "warning" : "danger"} size="sm">
              {score >= 70 ? "Strong" : score >= 40 ? "Developing" : "Early stage"}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Tab navigation */}
      <div className="flex gap-1 bg-canvas p-1 rounded-xl border border-border w-fit">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150",
              activeTab === id
                ? "bg-white text-text-primary shadow-soft-sm border border-border"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            <Icon className="size-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === "problem" && (
            <div className="space-y-5">
              <Card padding="lg">
                <h2 className="text-base font-semibold text-text-primary mb-4">Problem Statement</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-text-primary block mb-2">
                      What problem are you solving?
                    </label>
                    <textarea
                      className="input textarea"
                      defaultValue="Working professionals in India lack access to affordable, bite-sized, career-relevant learning content that fits into their busy schedules and delivers immediate professional value."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-primary block mb-2">
                      Who experiences this problem?
                    </label>
                    <textarea
                      className="input"
                      placeholder="Describe your target audience..."
                      defaultValue="Mid-career professionals aged 25-35 in Tier 1-2 Indian cities, currently employed, earning 8-25 LPA, who want to upskill but struggle with time, relevance, and motivation in existing platforms."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-primary block mb-2">
                      How are they solving it today? (current alternatives)
                    </label>
                    <textarea
                      className="input"
                      placeholder="List existing solutions..."
                      defaultValue="YouTube tutorials (free but unstructured), Udemy courses (purchasing but not completing), LinkedIn Learning (enterprise), peer learning (informal)."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-primary block mb-2">
                      Why are current solutions insufficient?
                    </label>
                    <textarea
                      className="input"
                      placeholder="What's missing in existing solutions..."
                      defaultValue="All existing solutions are designed for full-time learning. None offer 10-15 min sessions with actionable career outcomes, peer accountability, and employer recognition."
                    />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "persona" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Card padding="lg">
                <h2 className="text-base font-semibold text-text-primary mb-4">Primary Persona</h2>
                <div className="flex items-center gap-3 mb-5">
                  <div className="size-14 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center text-xl font-bold">
                    R
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">Rahul, 28</p>
                    <p className="text-sm text-text-muted">Software Engineer, Bangalore</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Goals", value: "Get promoted to Senior Engineer, learn system design" },
                    { label: "Frustrations", value: "No time after work + family, existing courses too long" },
                    { label: "Channels", value: "LinkedIn, Twitter, tech podcasts" },
                    { label: "Willingness to pay", value: "₹500-800/month for clear career value" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">{label}</p>
                      <p className="text-sm text-text-secondary">{value}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card padding="lg">
                <h2 className="text-base font-semibold text-text-primary mb-4">Build New Persona</h2>
                <div className="space-y-3">
                  {["Name & Age", "Job Title & Location", "Primary Goal", "Top Frustration", "Where they hang out", "Willingness to pay"].map((field) => (
                    <div key={field}>
                      <label className="text-xs font-medium text-text-muted block mb-1.5">{field}</label>
                      <input className="input" placeholder={`Enter ${field.toLowerCase()}...`} />
                    </div>
                  ))}
                  <Button variant="primary" size="md" className="w-full mt-2">
                    Save Persona
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "checklist" && (
            <Card padding="lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-text-primary">Validation Checklist</h2>
                <Badge variant="primary">{completed}/{items.length} done</Badge>
              </div>
              <div className="space-y-3">
                {items.map(({ id, label, done }) => (
                  <label
                    key={id}
                    className="flex items-center gap-3 p-3.5 rounded-xl cursor-pointer hover:bg-canvas transition-colors"
                  >
                    <button
                      onClick={() => toggleItem(id)}
                      className="flex-shrink-0"
                    >
                      {done ? (
                        <CheckCircle2 className="size-5 text-emerald-500" />
                      ) : (
                        <Circle className="size-5 text-text-muted" />
                      )}
                    </button>
                    <span className={cn("text-sm", done ? "line-through text-text-muted" : "text-text-primary")}>
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "feedback" && (
            <div className="space-y-5">
              {/* Past feedback */}
              <Card padding="lg">
                <h2 className="text-base font-semibold text-text-primary mb-4">Mentor Feedback</h2>
                <div className="space-y-4">
                  {[
                    {
                      mentor: "Meera Patel",
                      avatar: "M",
                      color: "bg-rose-100 text-rose-600",
                      date: "2 days ago",
                      message: "Strong problem statement. The persona is well-defined. Next step — narrow down your validation approach. Focus on willingness to pay first, not just problem validation.",
                    },
                    {
                      mentor: "Vikram Nair",
                      avatar: "V",
                      color: "bg-primary-100 text-primary-600",
                      date: "1 week ago",
                      message: "Your market sizing is too broad. Segment it — start with Bangalore tech workers before expanding. TAM should be your realistic 5-year addressable market.",
                    },
                  ].map(({ mentor, avatar, color, date, message }) => (
                    <div key={mentor} className="flex gap-3">
                      <div className={`size-9 rounded-full ${color} flex items-center justify-center text-sm font-semibold flex-shrink-0`}>
                        {avatar}
                      </div>
                      <div className="flex-1 bg-canvas rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-text-primary">{mentor}</span>
                          <span className="text-xs text-text-muted">{date}</span>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed">{message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Submit for feedback */}
              <Card padding="lg">
                <h2 className="text-base font-semibold text-text-primary mb-4">Request Feedback</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-text-primary block mb-2">
                      What would you like feedback on?
                    </label>
                    <textarea
                      className="input textarea"
                      placeholder="Describe what specific aspect you want reviewed — your problem statement, persona accuracy, validation approach..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-primary block mb-2">
                      Select mentor to request from
                    </label>
                    <select className="input">
                      <option>Meera Patel — HealthTech</option>
                      <option>Vikram Nair — Fintech</option>
                      <option>Sunita Rao — EdTech</option>
                    </select>
                  </div>
                  <Button variant="primary" size="lg" rightIcon={<Send className="size-4" />}>
                    Submit for Review
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
