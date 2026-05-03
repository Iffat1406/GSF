"use client";

import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  BarChart3,
  UserCheck,
  Settings,
  TrendingUp,
  Activity,
  Plus,
  Shield,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";

// Admin dashboard - hidden behind role-based access control
// Only accessible to users with role === "admin"

const PLATFORM_STATS = [
  { label: "Total Users", value: "524", icon: Users, change: "+32 this month", color: "text-primary-500", bg: "bg-primary-50" },
  { label: "Active Cohorts", value: "3", icon: Calendar, change: "2 upcoming", color: "text-secondary-500", bg: "bg-secondary-50" },
  { label: "Expert Mentors", value: "42", icon: UserCheck, change: "8 pending approval", color: "text-amber-500", bg: "bg-amber-50" },
  { label: "Sessions Run", value: "680", icon: Activity, change: "This cohort cycle", color: "text-emerald-500", bg: "bg-emerald-50" },
];

const COHORTS = [
  { name: "Cohort 2 — Explorer", track: "Explorer", students: 24, max: 30, mentor: "Meera Patel", status: "active", started: "Jan 2024" },
  { name: "Cohort 2 — Builder", track: "Builder", students: 18, max: 25, mentor: "Vikram Nair", status: "active", started: "Jan 2024" },
  { name: "Cohort 3 — Explorer", track: "Explorer", students: 0, max: 30, mentor: "TBD", status: "upcoming", started: "Mar 2024" },
];

const PENDING_EXPERTS = [
  { name: "Karan Shah", company: "Zepto", domain: "Quick Commerce", applied: "2d ago" },
  { name: "Nisha Verma", company: "PhonePe", domain: "Fintech", applied: "3d ago" },
  { name: "Aryan Bose", company: "Licious", domain: "D2C", applied: "5d ago" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="size-5 text-primary-500" />
            <span className="text-xs font-semibold text-primary-600 uppercase tracking-widest">Admin Control Panel</span>
          </div>
          <h1 className="text-2xl font-semibold text-text-primary">Platform Overview</h1>
          <p className="text-text-secondary mt-1">Manage cohorts, users, experts, and platform analytics.</p>
        </div>
        <Button variant="primary" size="md" leftIcon={<Plus className="size-4" />}>
          Create Cohort
        </Button>
      </div>

      {/* Platform stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {PLATFORM_STATS.map(({ label, value, icon: Icon, change, color, bg }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card padding="sm" className="space-y-3">
              <div className={`size-9 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={`size-5 ${color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{value}</p>
                <p className="text-xs text-text-muted mt-0.5">{label}</p>
              </div>
              <p className="text-xs text-text-secondary">{change}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cohorts */}
        <div className="lg:col-span-2 space-y-5">
          <Card padding="lg">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-text-primary">Active & Upcoming Cohorts</h2>
              <Button variant="outline" size="sm" leftIcon={<Plus className="size-3.5" />}>
                New Cohort
              </Button>
            </div>
            <div className="space-y-4">
              {COHORTS.map((cohort) => (
                <div key={cohort.name} className="p-4 rounded-xl border border-border hover:bg-canvas transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{cohort.name}</p>
                      <p className="text-xs text-text-muted">Mentor: {cohort.mentor} · Started {cohort.started}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={cohort.track === "Explorer" ? "primary" : "secondary"} size="sm">
                        {cohort.track}
                      </Badge>
                      <Badge variant={cohort.status === "active" ? "success" : "gray"} size="sm" dot>
                        {cohort.status}
                      </Badge>
                    </div>
                  </div>
                  <Progress
                    label={`${cohort.students}/${cohort.max} students`}
                    value={Math.round((cohort.students / cohort.max) * 100)}
                    size="sm"
                    showValue
                  />
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">View cohort</Button>
                    <Button variant="ghost" size="sm">Assign mentor</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Engagement analytics */}
          <Card padding="lg">
            <h2 className="text-base font-semibold text-text-primary mb-5">Platform Engagement</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Module completion rate", value: 74, variant: "primary" as const },
                { label: "Session attendance", value: 88, variant: "secondary" as const },
                { label: "Idea submission rate", value: 62, variant: "primary" as const },
                { label: "Mentor response rate", value: 95, variant: "success" as const },
              ].map(({ label, value, variant }) => (
                <div key={label} className="space-y-2">
                  <Progress label={label} value={value} size="sm" showValue variant={variant} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right */}
        <div className="space-y-5">
          {/* Expert approvals */}
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-text-primary">Pending Expert Approvals</h2>
              <Badge variant="warning">{PENDING_EXPERTS.length}</Badge>
            </div>
            <div className="space-y-3">
              {PENDING_EXPERTS.map(({ name, company, domain, applied }) => (
                <div key={name} className="p-3 rounded-xl bg-canvas border border-border space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold">
                      {name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-primary">{name}</p>
                      <p className="text-xs text-text-muted">{company} · {domain}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1">Approve</Button>
                    <Button variant="ghost" size="sm" className="flex-1 text-red-500 hover:bg-red-50">Reject</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick admin actions */}
          <Card padding="md">
            <h2 className="text-sm font-semibold text-text-primary mb-3">Admin Actions</h2>
            <div className="space-y-2">
              {[
                { label: "Manage all users", icon: Users },
                { label: "View analytics", icon: BarChart3 },
                { label: "Track engagement", icon: TrendingUp },
                { label: "Platform settings", icon: Settings },
              ].map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:bg-canvas hover:text-text-primary transition-all duration-150 text-left"
                >
                  <Icon className="size-4 text-text-muted" />
                  {label}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
