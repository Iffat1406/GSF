"use client";

import { useState, useEffect, useCallback } from "react";
import type { Venture } from "@/lib/schema";

export function useVenture() {
  const [venture,  setVenture]  = useState<Venture | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const fetchVenture = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/venture");
      if (!res.ok) throw new Error("Failed to load venture");
      const data = await res.json();
      setVenture(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchVenture(); }, [fetchVenture]);

  const updateVenture = useCallback(async (updates: Partial<Venture>) => {
    setSaving(true);
    try {
      const res = await fetch("/api/venture", {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to save venture");
      const saved = await res.json();
      setVenture(saved);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  return { venture, loading, saving, error, updateVenture, refetch: fetchVenture };
}
