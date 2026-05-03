"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  Lightbulb,
  Users,
  UserCheck,
  BookOpen,
  User,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STUDENT_NAV = [
  { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { label: "My Journey", href: "/student/journey", icon: Map },
  { label: "My Idea", href: "/student/idea", icon: Lightbulb },
  { label: "Cohort", href: "/student/cohort", icon: Users },
  { label: "Experts", href: "/student/experts", icon: UserCheck },
  { label: "Resources", href: "/student/resources", icon: BookOpen },
  { label: "Profile", href: "/student/profile", icon: User },
];

const EXPERT_NAV = [
  { label: "Dashboard", href: "/expert/dashboard", icon: LayoutDashboard },
  { label: "Sessions", href: "/expert/sessions", icon: Map },
  { label: "Students", href: "/expert/students", icon: Users },
  { label: "Reviews", href: "/expert/reviews", icon: BookOpen },
  { label: "Resources", href: "/expert/resources", icon: BookOpen },
  { label: "Profile", href: "/expert/profile", icon: User },
];

interface SidebarProps {
  role?: "student" | "expert" | "admin";
  userName?: string;
  userEmail?: string;
}

export function Sidebar({ role = "student", userName = "Student", userEmail = "" }: SidebarProps) {
  const pathname = usePathname();
  const navItems = role === "expert" ? EXPERT_NAV : STUDENT_NAV;

  return (
    <aside className="w-64 bg-white border-r border-border flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 px-5 flex items-center border-b border-border flex-shrink-0">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="size-8 rounded-xl bg-primary-500 flex items-center justify-center shadow-soft-sm">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <span className="font-semibold text-text-primary tracking-tight">GSF</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5 scrollbar-hide">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                active
                  ? "bg-primary-50 text-primary-600"
                  : "text-text-secondary hover:bg-canvas hover:text-text-primary"
              )}
            >
              <Icon
                className={cn(
                  "size-[18px] flex-shrink-0",
                  active ? "text-primary-500" : "text-text-muted"
                )}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-canvas">
          <div className="size-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-semibold flex-shrink-0">
            {userName[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-text-primary truncate">{userName}</p>
            <p className="text-xs text-text-muted truncate">{userEmail || role}</p>
          </div>
          <button className="text-text-muted hover:text-text-secondary transition-colors p-1 rounded-lg hover:bg-gray-100">
            <LogOut className="size-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
