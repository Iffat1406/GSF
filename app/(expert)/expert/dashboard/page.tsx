"use client";

import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Star,
  Clock,
  CheckCircle2,
  MessageSquare,
  ChevronRight,
  ArrowRight,
  Bell,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import Link from "next/link";

const STATS = [
  { label: "Assigned Students", value: "8", icon: Users, color: "text-primary-500", bg: "bg-primary-50" },
  { label: "Sessions Done", value: "48", icon: Calendar, color: "text-secondary-500", bg: "bg-secondary-50" },
  { label: "Avg. Rating", value: "4.9", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
  { label: "Hours Mentored", value: "62h", icon: Clock, color: "text-violet-500", bg: "bg-violet-50" },
];

const MENTEES = [
  { name: "Arjun Sharma", idea: "EdTech for Professionals", progress: 67, lastSession: "2d ago", avatar: "A", color: "bg-primary-100 text-primary-600", status: "active" },
  { name: "Priya Mehta", idea: "HealthTech Diagnostics", progress: 82, lastSession: "1d ago", avatar: "P", color: "bg-rose-100 text-rose-600", status: "active" },
  { name: "Rishi Kumar", idea: "AgriTech for Farmers", progress: 45, lastSession: "5d ago", avatar: "R", color: "bg-amber-100 text-amber-600", status: "needs-attention" },
  { name: "Anika Verma", idea: "Fintech Savings App", progress: 91, lastSession: "Today", avatar: "A", color: "bg-secondary-100 text-secondary-600", status: "advanced" },
];

const UPCOMING_SESSIONS = [
  { student: "Arjun Sharma", type: "Idea Feedback", when: "Today, 3:00 PM", topic: "Validation approach review" },
  { student: "Priya Mehta", type: "Strategy", when: "Tomorrow, 11:00 AM", topic: "GTM planning session" },
  { student: "Rishi Kumar", type: "Kickoff", when: "Thu, 4:00 PM", topic: "First 1-on-1 check-in" },
];

const REVIEW_REQUESTS = [
  { student: "Arjun S.", idea: "EdTech Platform", submitted: "1h ago", type: "Problem Statement" },
  { student: "Anika V.", idea: "Fintech App", submitted: "3h ago", type: "Pitch Review" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function ExpertDashboardPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <motion.div {...fadeUp(0)} className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary flex items-center gap-2">
            Welcome back, Meera <Sparkles className="size-5 text-amber-400" />
          </h1>
          <p className="text-text-secondary mt-1">
            You have 2 pending reviews and 3 sessions this week.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="primary" dot>Active Mentor</Badge>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} padding="sm" className="space-y-3">
            <div className={`size-9 rounded-xl ${bg} flex items-center justify-center`}>
              <Icon className={`size-5 ${color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{value}</p>
              <p className="text-xs text-text-muted mt-0.5">{label}</p>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — mentees + sessions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assigned mentees */}
          <motion.div {...fadeUp(0.15)}>
            <Card padding="lg">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-text-primary">Assigned Mentees</h2>
                <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="size-3" />} asChild>
                  <Link href="/expert/students">View all</Link>
                </Button>
              </div>
              <div className="space-y-3">
                {MENTEES.map(({ name, idea, progress, lastSession, avatar, color, status }) => (
                  <div
                    key={name}
                    className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-canvas transition-colors"
                  >
                    <div className={`size-10 rounded-full ${color} flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                      {avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-text-primary">{name}</span>
                        <Badge
                          variant={status === "advanced" ? "success" : status === "needs-attention" ? "warning" : "gray"}
                          size="sm"
                          dot
                        >
                          {status === "advanced" ? "Advanced" : status === "needs-attention" ? "Needs check-in" : "Active"}
                        </Badge>
                      </div>
                      <p className="text-xs text-text-muted mt-0.5">{idea}</p>
                      <Progress value={progress} size="sm" className="mt-2 max-w-48" />
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-text-muted">{lastSession}</p>
                      <Button variant="outline" size="sm" className="mt-1.5" asChild>
                        <Link href="/expert/sessions">Book</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Session calendar */}
          <motion.div {...fadeUp(0.2)}>
            <Card padding="lg">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-text-primary">Upcoming Sessions</h2>
                <Badge variant="primary">{UPCOMING_SESSIONS.length} this week</Badge>
              </div>
              <div className="space-y-3">
                {UPCOMING_SESSIONS.map(({ student, type, when, topic }) => (
                  <div
                    key={student + when}
                    className="flex items-start gap-4 p-4 rounded-xl bg-canvas border border-border"
                  >
                    <div className="size-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {student[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-text-primary">{student}</span>
                        <Badge variant="gray" size="sm">{type}</Badge>
                      </div>
                      <p className="text-xs text-text-muted mt-0.5">{topic}</p>
                      <p className="text-xs font-medium text-primary-600 mt-1.5">{when}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Join
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="md" className="w-full mt-4" asChild>
                <Link href="/expert/sessions">Manage availability</Link>
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Review requests */}
          <motion.div {...fadeUp(0.2)}>
            <Card padding="md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-text-primary">Review Requests</h2>
                <span className="size-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-bold">
                  {REVIEW_REQUESTS.length}
                </span>
              </div>
              <div className="space-y-3">
                {REVIEW_REQUESTS.map(({ student, idea, submitted, type }) => (
                  <div key={student + type} className="p-3.5 rounded-xl bg-primary-50 border border-primary-100 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-text-primary">{student}</span>
                      <Badge variant="primary" size="sm">{type}</Badge>
                    </div>
                    <p className="text-xs text-text-muted">{idea} · {submitted}</p>
                    <Button variant="primary" size="sm" rightIcon={<ArrowRight className="size-3" />} className="w-full" asChild>
                      <Link href="/expert/reviews">Review now</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Feedback threads */}
          <motion.div {...fadeUp(0.25)}>
            <Card padding="md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-text-primary">Feedback Threads</h2>
                <MessageSquare className="size-4 text-text-muted" />
              </div>
              <div className="space-y-3">
                {[
                  { name: "Arjun S.", reply: "Thanks Meera! I'll narrow the persona to Bangalore.", time: "30m ago" },
                  { name: "Priya M.", reply: "The GTM feedback was super helpful — pivoted to B2B.", time: "2h ago" },
                ].map(({ name, reply, time }) => (
                  <div key={name} className="p-3 rounded-xl bg-canvas space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-text-primary">{name}</span>
                      <span className="text-xs text-text-muted">{time}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{reply}</p>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-2" asChild>
                <Link href="/expert/reviews">View all threads</Link>
              </Button>
            </Card>
          </motion.div>

          {/* Quick stats */}
          <motion.div {...fadeUp(0.3)}>
            <Card padding="md">
              <h2 className="text-sm font-semibold text-text-primary mb-3">This Month</h2>
              <div className="space-y-3">
                {[
                  { label: "Sessions completed", value: "12" },
                  { label: "Ideas reviewed", value: "8" },
                  { label: "Feedback given", value: "24" },
                  { label: "Avg. session rating", value: "4.9 ★" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">{label}</span>
                    <span className="text-xs font-semibold text-text-primary">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
