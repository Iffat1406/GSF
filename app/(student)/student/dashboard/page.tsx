"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  TrendingUp,
  Clock,
  Users,
  ArrowRight,
  Calendar,
  BookOpen,
  Lightbulb,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import Link from "next/link";

const STATS = [
  { label: "Tasks Completed", value: "12", icon: CheckCircle2, change: "+3 this week", trend: "up", color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Idea Score", value: "78%", icon: TrendingUp, change: "+12 since last review", trend: "up", color: "text-primary-500", bg: "bg-primary-50" },
  { label: "Hours Spent", value: "24h", icon: Clock, change: "This cohort", trend: "neutral", color: "text-amber-500", bg: "bg-amber-50" },
  { label: "Peer Connections", value: "8", icon: Users, change: "Active peers", trend: "neutral", color: "text-secondary-500", bg: "bg-secondary-50" },
];

const PEER_ACTIVITY = [
  { avatar: "P", color: "bg-secondary-100 text-secondary-600", name: "Priya M.", action: "completed Module 4", time: "10m ago" },
  { avatar: "R", color: "bg-primary-100 text-primary-600", name: "Rishi K.", action: "shared a validation doc", time: "1h ago" },
  { avatar: "A", color: "bg-amber-100 text-amber-600", name: "Anika V.", action: "booked session with Meera", time: "2h ago" },
];

const UPCOMING = [
  { title: "1-on-1 with Meera Patel", type: "Session", when: "Today, 3:00 PM", color: "bg-primary-50 border-primary-200" },
  { title: "Cohort sync call", type: "Group", when: "Tomorrow, 5:00 PM", color: "bg-secondary-50 border-secondary-200" },
  { title: "Module 5 deadline", type: "Deadline", when: "Friday", color: "bg-amber-50 border-amber-200" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome */}
      <motion.div {...fadeUp(0)} className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary flex items-center gap-2">
            Good morning, Arjun <Sparkles className="size-5 text-amber-400" />
          </h1>
          <p className="text-text-secondary mt-1">
            You&apos;re on Module 4 of 6. Keep the momentum going!
          </p>
        </div>
        <Badge variant="primary" dot>Explorer Track</Badge>
      </motion.div>

      {/* Stat cards */}
      <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, icon: Icon, change, color, bg }) => (
          <Card key={label} padding="sm" className="space-y-3">
            <div className={`size-9 rounded-xl ${bg} flex items-center justify-center`}>
              <Icon className={`size-5 ${color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{value}</p>
              <p className="text-xs text-text-muted mt-0.5">{label}</p>
            </div>
            <p className="text-xs text-emerald-600">{change}</p>
          </Card>
        ))}
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress tracker */}
          <motion.div {...fadeUp(0.15)}>
            <Card padding="lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-text-primary">Cohort Progress</h2>
                <Badge variant="primary">67% complete</Badge>
              </div>
              <div className="space-y-5">
                {[
                  { label: "Problem Framing", value: 100, status: "complete" },
                  { label: "Customer Research", value: 100, status: "complete" },
                  { label: "Market Sizing", value: 100, status: "complete" },
                  { label: "Idea Validation", value: 60, status: "in-progress" },
                  { label: "Pitch Preparation", value: 0, status: "locked" },
                  { label: "Demo Day", value: 0, status: "locked" },
                ].map(({ label, value, status }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-4 flex-shrink-0">
                      {status === "complete" ? (
                        <CheckCircle2 className="size-4 text-emerald-500" />
                      ) : status === "in-progress" ? (
                        <div className="size-4 rounded-full border-2 border-primary-500 bg-primary-100" />
                      ) : (
                        <div className="size-4 rounded-full border-2 border-gray-200" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Progress
                        label={label}
                        value={value}
                        size="sm"
                        showValue
                        variant={status === "complete" ? "success" : "primary"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Current module */}
          <motion.div {...fadeUp(0.2)}>
            <Card padding="lg" className="border-l-4 border-l-primary-500">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="size-11 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="size-5 text-primary-500" />
                  </div>
                  <div>
                    <Badge variant="primary" size="sm" className="mb-2">Current Module</Badge>
                    <h3 className="text-base font-semibold text-text-primary">
                      Module 4: Idea Validation Frameworks
                    </h3>
                    <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                      Learn how to design and run customer discovery interviews, create validation hypotheses, and track evidence scientifically.
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <Progress value={60} size="sm" className="w-32" />
                      <span className="text-xs text-text-muted">3 of 5 tasks</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-border">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="size-4" />} asChild>
                  <Link href="/student/journey">Continue module</Link>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Peer activity */}
          <motion.div {...fadeUp(0.25)}>
            <Card padding="lg">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-text-primary">Peer Activity</h2>
                <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="size-3" />} asChild>
                  <Link href="/student/cohort">View cohort</Link>
                </Button>
              </div>
              <div className="space-y-4">
                {PEER_ACTIVITY.map(({ avatar, color, name, action, time }) => (
                  <div key={name} className="flex items-center gap-3">
                    <div className={`size-8 rounded-full ${color} flex items-center justify-center text-xs font-semibold flex-shrink-0`}>
                      {avatar}
                    </div>
                    <p className="text-sm text-text-secondary flex-1">
                      <span className="font-medium text-text-primary">{name}</span>{" "}
                      {action}
                    </p>
                    <span className="text-xs text-text-muted flex-shrink-0">{time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Upcoming sessions */}
          <motion.div {...fadeUp(0.2)}>
            <Card padding="md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-text-primary">Upcoming</h2>
                <Calendar className="size-4 text-text-muted" />
              </div>
              <div className="space-y-3">
                {UPCOMING.map(({ title, type, when, color }) => (
                  <div key={title} className={`p-3 rounded-xl border ${color} space-y-1`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-text-primary leading-snug">{title}</span>
                      <Badge variant="gray" size="sm">{type}</Badge>
                    </div>
                    <p className="text-xs text-text-muted">{when}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                <Link href="/student/experts">Book a session</Link>
              </Button>
            </Card>
          </motion.div>

          {/* Mentor suggestions */}
          <motion.div {...fadeUp(0.25)}>
            <Card padding="md">
              <h2 className="text-base font-semibold text-text-primary mb-4">Mentor Suggestions</h2>
              <div className="space-y-3">
                {[
                  { name: "Meera Patel", domain: "HealthTech", avatar: "M", color: "bg-rose-100 text-rose-600" },
                  { name: "Vikram Nair", domain: "Fintech", avatar: "V", color: "bg-primary-100 text-primary-600" },
                ].map(({ name, domain, avatar, color }) => (
                  <div key={name} className="flex items-center gap-3 p-3 rounded-xl bg-canvas">
                    <div className={`size-9 rounded-full ${color} flex items-center justify-center text-sm font-semibold`}>
                      {avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary">{name}</p>
                      <p className="text-xs text-text-muted">{domain}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/student/experts">Book</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Quick actions */}
          <motion.div {...fadeUp(0.3)}>
            <Card padding="md">
              <h2 className="text-base font-semibold text-text-primary mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { label: "Update my idea", icon: Lightbulb, href: "/student/idea" },
                  { label: "View resources", icon: BookOpen, href: "/student/resources" },
                  { label: "Edit profile", icon: Users, href: "/student/profile" },
                ].map(({ label, icon: Icon, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:bg-canvas hover:text-text-primary transition-all duration-150"
                  >
                    <Icon className="size-4 text-text-muted" />
                    {label}
                    <ChevronRight className="size-3.5 ml-auto text-text-muted" />
                  </Link>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
