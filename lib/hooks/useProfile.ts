"use client";

import { useState, useEffect, useCallback } from "react";

export interface ProfileData {
  id:         string;
  name:       string;
  email:      string;
  imageUrl:   string;
  role:       string;
  credits:    number;
  plan:       string;
  bio:        string;
  university: string;
  year:       string;
  location:   string;
  linkedin:   string;
  website:    string;
}

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error("Failed to load profile");
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const updateProfile = useCallback(async (updates: Partial<ProfileData>) => {
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to save profile");
      setProfile(prev => prev ? { ...prev, ...updates } : prev);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  return { profile, loading, saving, error, updateProfile, refetch: fetchProfile };
}
