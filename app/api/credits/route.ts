// app/api/credits/route.ts
// GET → returns credit balance (from Clerk publicMetadata) + transaction log (from DB)

import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { creditTransactions } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Get balance from Clerk publicMetadata (source of truth)
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const balance = (user.publicMetadata?.credits as number) ?? 600;

  // Get transaction log from DB
  const log = await db
    .select()
    .from(creditTransactions)
    .where(eq(creditTransactions.clerkUserId, userId))
    .orderBy(desc(creditTransactions.createdAt))
    .limit(50);

  return NextResponse.json({ balance, log });
}
