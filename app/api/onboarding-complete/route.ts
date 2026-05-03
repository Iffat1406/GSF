import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { role, credits, plan } = body;

  if (!role || !["founder", "expert"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  // Save role + credits + plan to Clerk publicMetadata (server-side only)
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      role,
      credits: credits ?? 600,
      plan: plan ?? "basic",
      onboardedAt: new Date().toISOString(),
    },
  });

  return NextResponse.json({ success: true });
}
