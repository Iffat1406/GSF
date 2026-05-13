"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, CheckCheck, MessageSquare, Sparkles, Megaphone, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotificationItem {
  id: string;
  type: string; // system | activity | message | announcement
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Live real-time polling to fetch notifications instantly without manual page refreshes
  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setNotifications(data);
        }
      }
    } catch (err) {
      // Quiet fallback
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll every 4 seconds for a snappy real-time experience
    const interval = setInterval(fetchNotifications, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle click outside to close popover smoothly
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Optimistic UI update instantly
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      // Quiet catch
    }
  };

  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAll: true }),
      });
    } catch (err) {
      // Quiet catch
    }
  };

  // Helper to map icon based on event type
  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="size-3.5 text-blue-500" />;
      case "activity":
        return <Sparkles className="size-3.5 text-amber-500" />;
      case "announcement":
        return <Megaphone className="size-3.5 text-indigo-500" />;
      default:
        return <ShieldAlert className="size-3.5 text-rose-500" />;
    }
  };

  // Format relative timestamp nicely
  const formatTime = (timeStr: string) => {
    const date = new Date(timeStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Trigger Button */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative p-2 rounded-xl transition-all duration-200",
          isOpen ? "bg-[rgba(91,108,255,0.1)] text-[var(--accent-indigo)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]"
        )}
        aria-label="Notifications"
      >
        <Bell className="size-4.5" />
        {/* Dynamic Unread Badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-1 right-1 size-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center shadow-sm"
              style={{ backgroundColor: "#EF4444" }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Popover Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] z-50 overflow-hidden border"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-default)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderBottomColor: "var(--border-soft)", backgroundColor: "var(--bg-surface)" }}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wide uppercase" style={{ color: "var(--text-primary)" }}>Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold" style={{ backgroundColor: "rgba(91,108,255,0.1)", color: "var(--accent-indigo)" }}>
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1 text-[10px] font-medium transition-colors hover:underline"
                  style={{ color: "var(--accent-indigo)" }}
                >
                  <CheckCheck className="size-3" />
                  Mark all read
                </button>
              )}
            </div>

            {/* List Body */}
            <div className="max-h-[360px] overflow-y-auto scrollbar-hide divide-y" style={{ divideColor: "var(--border-soft)" }}>
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>No notifications yet</p>
                </div>
              ) : (
                notifications.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    onClick={() => {
                      // Mark as read when clicking the whole row if unread
                      if (!item.isRead) {
                        setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, isRead: true } : n));
                        fetch("/api/notifications", { method: "PATCH", body: JSON.stringify({ id: item.id }) }).catch(() => {});
                      }
                    }}
                    className={cn(
                      "p-3.5 flex gap-3 items-start transition-colors cursor-pointer relative group",
                      !item.isRead ? "bg-[rgba(91,108,255,0.03)] hover:bg-[rgba(91,108,255,0.06)]" : "hover:bg-[var(--bg-surface)]"
                    )}
                  >
                    {/* Unread indicator strip */}
                    {!item.isRead && (
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--accent-indigo)]" />
                    )}

                    {/* Icon wrapper */}
                    <div className="size-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "var(--bg-surface-2)" }}>
                      {getIcon(item.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <p className={cn("text-xs truncate", !item.isRead ? "font-bold text-[var(--text-primary)]" : "font-semibold text-[var(--text-secondary)]")}>
                          {item.title}
                        </p>
                        <span className="text-[9px] flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                          {formatTime(item.createdAt)}
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: item.isRead ? "var(--text-muted)" : "var(--text-secondary)" }}>
                        {item.message}
                      </p>
                    </div>

                    {/* Individual mark read check button */}
                    {!item.isRead && (
                      <button
                        onClick={(e) => markAsRead(item.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-md transition-all hover:bg-[var(--bg-surface-2)] text-[var(--text-muted)] hover:text-[var(--accent-indigo)] ml-auto"
                        title="Mark as read"
                      >
                        <Check className="size-3" />
                      </button>
                    )}
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-2 border-t text-center bg-[var(--bg-surface)]" style={{ borderTopColor: "var(--border-soft)" }}>
              <span className="text-[9px] uppercase tracking-wider font-medium text-[var(--text-muted)]">
                Real-Time Event Synchronized
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
