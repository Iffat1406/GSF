// ===== CREDIT SYSTEM UTILITIES =====
// Client-side helpers only.
// Actual credit balances are stored in Clerk publicMetadata (source of truth).
// Transaction log is stored in Supabase via /api/credits.

// ===== PRICING TABLE =====
export const EXPERT_SESSION_COSTS: Record<string, number> = {
  "0-2yr": 100,
  "2-5yr": 200,
  "5+yr":  350,
};

export const EXPERT_SESSION_EARN = 80; // 80 credits per session to expert

// ===== CREDIT TIER LABELS =====
export function getCreditTierLabel(credits: number): string {
  if (credits >= 2000) return "Premium";
  if (credits >= 1500) return "Standard";
  if (credits >= 600)  return "Basic";
  return "Low Balance";
}

export function getCreditBarPercent(credits: number, max = 600): number {
  return Math.min(100, Math.round((credits / max) * 100));
}
