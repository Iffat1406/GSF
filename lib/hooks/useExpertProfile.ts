"use client";

import { useState, useEffect, useCallback } from "react";
import type { ExpertProfile } from "@/lib/schema";

export function useExpertProfile() {
  const [profile,  setProfile]  = useState<ExpertProfile | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/expert-profile");
      if (!res.ok) throw new Error("Failed to load expert profile");
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const updateExpertProfile = useCallback(async (updates: Partial<ExpertProfile>) => {
    setSaving(true);
    try {
      const res = await fetch("/api/expert-profile", {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to save expert profile");
      const saved = await res.json();
      setProfile(saved);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  return { profile, loading, saving, error, updateExpertProfile, refetch: fetchProfile };
}
