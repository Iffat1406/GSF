"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useUser } from "@clerk/nextjs";
import { clerkUserToAuthUser } from "@/lib/auth";
import { Coins, ArrowUpRight, BarChart2, TrendingUp, Zap, CreditCard, ShoppingBag, Star } from "lucide-react";

const TRANSACTIONS = [
  { id: 1, type: "credit", amount: 80,  reason: "Session completed: Arjun Sharma (EduLoop)",      date: "Apr 8, 2026",  balance: 420 },
  { id: 2, type: "credit", amount: 100, reason: "Session completed: Priya Mehta (Supplify)",       date: "Apr 6, 2026",  balance: 340 },
  { id: 3, type: "credit", amount: 100, reason: "Session completed: Rahul Kumar (HealthBridge)",   date: "Apr 2, 2026",  balance: 240 },
  { id: 4, type: "credit", amount: 80,  reason: "Session completed: Dev Singh (AgriChain)",        date: "Mar 30, 2026", balance: 140 },
  { id: 5, type: "credit", amount: 60,  reason: "Referral bonus — Sneha Rao joined",               date: "Mar 28, 2026", balance: 60 },
];

const REDEEM_OPTIONS = [
  { label: "UPI Transfer",     value: "₹1,680",  credits: 420, icon: CreditCard },
  { label: "Amazon Gift Card", value: "₹1,500",  credits: 420, icon: ShoppingBag },
  { label: "GSF Premium",      value: "1 month", credits: 200, icon: Star },
];

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: d, duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function ExpertCreditsPage() {
  const { user: clerkUser } = useUser();
  const user = clerkUser ? clerkUserToAuthUser(clerkUser) : null;
  const earned = user?.credits ?? 420;

  const monthlyTarget = 500;
  const pct = Math.min(100, (earned / monthlyTarget) * 100);

  return (
    <DashboardShell role="expert">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div {...fadeUp(0)}>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-primary)" }}>
            Credits Earned
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Track your earnings from sessions, referrals, and bonuses. Redeem anytime.
          </p>
        </motion.div>

        {/* Balance card */}
        <motion.div {...fadeUp(0.05)}
          className="p-8 rounded-3xl relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0B1A1A, #0A1525)", border: "1px solid rgba(79,209,197,0.3)" }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(79,209,197,0.15)" }} />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Credits Earned</p>
              <div className="flex items-end gap-2">
                <span className="text-6xl font-extrabold" style={{ color: "#4FD1C5", fontFamily: "'Playfair Display', serif" }}>
                  {earned}
                </span>
                <span className="text-gray-400 mb-2">credits</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">≈ ₹{(earned * 4).toLocaleString()} · Monthly target: {monthlyTarget}</p>
            </div>
            <div className="sm:ml-auto w-full sm:w-64">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>April progress</span><span>{Math.round(pct)}%</span>
              </div>
              <div className="h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                <motion.div className="h-full rounded-full"
                  style={{ background: "linear-gradient(to right, #4FD1C5, #5B6CFF)" }}
                  initial={{ width: "0%" }} animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, ease: "easeOut" }} />
              </div>
              <p className="text-xs text-gray-500 mt-2">1 credit ≈ ₹4 on redemption</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transactions */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-2 card p-6">
            <div className="flex items-center gap-2 mb-5">
              <Coins className="size-4" style={{ color: "#4FD1C5" }} />
              <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Earning History</h2>
            </div>
            <div className="space-y-3">
              {TRANSACTIONS.map(tx => (
                <div key={tx.id} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ backgroundColor: "var(--bg-surface-2)", border: "1px solid var(--border-soft)" }}>
                  <div className="size-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(79,209,197,0.12)" }}>
                    <ArrowUpRight className="size-4" style={{ color: "#4FD1C5" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{tx.reason}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{tx.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold" style={{ color: "#4FD1C5" }}>+{tx.amount}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Bal: {tx.balance}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats + Redeem */}
          <motion.div {...fadeUp(0.15)} className="space-y-4">
            {[
              { label: "Total earned",     value: earned,    icon: TrendingUp, color: "#4FD1C5" },
              { label: "Sessions done",    value: 4,         icon: BarChart2,  color: "#5B6CFF" },
              { label: "Bonus credits",    value: 60,        icon: Zap,        color: "#F59E0B" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="card p-4 flex items-center gap-3">
                <div className="size-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                  <Icon className="size-4" style={{ color }} />
                </div>
                <div>
                  <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{value}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Redeem */}
        <motion.div {...fadeUp(0.2)} className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Coins className="size-4" style={{ color: "#4FD1C5" }} />
            <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Redeem Credits</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {REDEEM_OPTIONS.map(opt => (
              <div key={opt.label} className="p-4 rounded-2xl border text-center cursor-pointer hover-scale transition-all"
                style={{ backgroundColor: "var(--bg-surface-2)", border: "1px solid var(--border-default)" }}>
                <opt.icon className="size-6 mx-auto mb-2" style={{ color: "#4FD1C5" }} />
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{opt.label}</p>
                <p className="text-lg font-bold mt-0.5" style={{ color: "#4FD1C5" }}>{opt.value}</p>
                <p className="text-[10px] mt-0.5 mb-3" style={{ color: "var(--text-muted)" }}>{opt.credits} credits</p>
                <button className="btn-outline text-xs py-1.5 px-4 w-full justify-center"
                  style={{ borderColor: "#4FD1C5", color: "#4FD1C5" }}>
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardShell>
  );
}
