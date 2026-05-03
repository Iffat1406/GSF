"use client";

import { useState, useEffect, useCallback } from "react";
import type { CreditTransaction } from "@/lib/schema";

export function useCredits() {
  const [balance,  setBalance]  = useState<number>(0);
  const [log,      setLog]      = useState<CreditTransaction[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  const fetchCredits = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/credits");
      if (!res.ok) throw new Error("Failed to load credits");
      const data = await res.json();
      setBalance(data.balance ?? 0);
      setLog(data.log ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCredits(); }, [fetchCredits]);

  return { balance, log, loading, error, refetch: fetchCredits };
}
