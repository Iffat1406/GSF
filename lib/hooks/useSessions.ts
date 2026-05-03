"use client";

import { useState, useEffect, useCallback } from "react";
import type { Session } from "@/lib/schema";

export function useSessions() {
  const [sessions,  setSessions]  = useState<Session[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/sessions");
      if (!res.ok) throw new Error("Failed to load sessions");
      const data = await res.json();
      setSessions(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSessions(); }, [fetchSessions]);

  const completed = sessions.filter(s => s.status === "completed");
  const upcoming  = sessions.filter(s => s.status === "confirmed" || s.status === "pending");
  const next      = upcoming[0] ?? null;

  return { sessions, completed, upcoming, next, loading, error, refetch: fetchSessions };
}
