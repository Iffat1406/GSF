// ===== GSF AUTH BRIDGE =====
// Maps Clerk user data to GSF's AuthUser interface.
// Clerk is the source of truth for identity.
// Role and extra profile data live in Clerk's publicMetadata.

export type Role = "founder" | "expert";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  credits: number;
  avatar: string;        // initials fallback e.g. "AS"
  avatarUrl?: string;    // Clerk profile image URL
  plan: string;
  planExpiresAt?: string;
}

// ====================================================================
// CLIENT-SIDE: call inside "use client" components via useUser() hook
// ====================================================================
// Usage:
//   import { useUser } from "@clerk/nextjs";
//   import { clerkUserToAuthUser } from "@/lib/auth";
//   const { user } = useUser();
//   const authUser = user ? clerkUserToAuthUser(user) : null;
// ====================================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function clerkUserToAuthUser(clerkUser: any): AuthUser {
  const meta = clerkUser.publicMetadata ?? {};
  const firstName = clerkUser.firstName ?? "";
  const lastName  = clerkUser.lastName  ?? "";
  const fullName  = [firstName, lastName].filter(Boolean).join(" ") || clerkUser.username || "User";
  const initials  = fullName.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);

  return {
    id:          clerkUser.id,
    email:       clerkUser.primaryEmailAddress?.emailAddress ?? "",
    name:        fullName,
    role:        (meta.role as Role) ?? "founder",
    credits:     typeof meta.credits === "number" ? meta.credits : 600,
    avatar:      initials,
    avatarUrl:   clerkUser.imageUrl ?? undefined,
    plan:        (meta.plan as string) ?? "basic",
    planExpiresAt: meta.planExpiresAt as string | undefined,
  };
}

// ====================================================================
// LEGACY SHIMS — keep working for pages that still use sessionStorage
// These will be gradually replaced by Clerk hooks.
// ====================================================================

const SESSION_KEY = "gsf_session";

export function setSession(user: AuthUser) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as AuthUser; } catch { return null; }
}

export function updateSession(updates: Partial<AuthUser>) {
  const current = getSession();
  if (!current) return;
  const updated = { ...current, ...updates };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(updated));
  return updated;
}

export function logout() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

export function requireRole(role: Role): boolean {
  const user = getSession();
  return user?.role === role;
}

export const REDIRECT_AFTER_LOGIN: Record<Role, string> = {
  founder: "/dashboard",
  expert:  "/expert-dashboard",
};
