// app/api/expert-profile/route.ts
// GET   → fetch this expert's extended profile from DB
// PATCH → upsert expert profile (specializations, sessionRate, etc.)

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { expertProfiles } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await db
    .select()
    .from(expertProfiles)
    .where(eq(expertProfiles.clerkUserId, userId));

  return NextResponse.json(rows[0] ?? null);
}

export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id: _id, clerkUserId: _cid, createdAt: _ca, ...updates } = body;

  const existing = await db
    .select({ id: expertProfiles.id })
    .from(expertProfiles)
    .where(eq(expertProfiles.clerkUserId, userId));

  if (existing.length === 0) {
    const [created] = await db
      .insert(expertProfiles)
      .values({ clerkUserId: userId, ...updates })
      .returning();
    return NextResponse.json(created);
  }

  const [updated] = await db
    .update(expertProfiles)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(expertProfiles.clerkUserId, userId))
    .returning();

  return NextResponse.json(updated);
}
