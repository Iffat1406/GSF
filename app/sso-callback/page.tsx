"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

// This page handles the OAuth redirect from Google/GitHub etc.
// Clerk's component finishes the OAuth handshake and then
// redirects to /onboarding (configured in .env.local)
export default function SSOCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="flex flex-col items-center gap-4">
        <div className="size-8 rounded-full border-2 border-t-[var(--accent-indigo)] animate-spin" style={{ borderColor: "var(--border-soft)", borderTopColor: "var(--accent-indigo)" }} />
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Completing sign in…</p>
      </div>
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
