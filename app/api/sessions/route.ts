// app/api/sessions/route.ts
// GET  → return sessions for logged-in user (as founder or expert)

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sessions } from "@/lib/schema";
import { eq, or, desc } from "drizzle-orm";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await db
    .select()
    .from(sessions)
    .where(
      or(
        eq(sessions.founderClerkId, userId),
        eq(sessions.expertClerkId, userId)
      )
    )
    .orderBy(desc(sessions.scheduledAt));

  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const [created] = await db
    .insert(sessions)
    .values({
      founderClerkId: userId,
      expertClerkId:  body.expertClerkId,
      founderName:    body.founderName ?? "",
      expertName:     body.expertName ?? "",
      ventureName:    body.ventureName ?? "",
      scheduledAt:    new Date(body.scheduledAt),
      duration:       body.duration ?? 30,
      creditsCost:    body.creditsCost ?? 100,
      creditsEarned:  body.creditsEarned ?? 80,
      status:         "pending",
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}
