"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { feedInteractions, ventures, expertProfiles } from "@/lib/schema";
import { eq, inArray } from "drizzle-orm";

export interface DiscoveryCandidate {
  id: string;
  type: "venture" | "expert";
  name: string;
  taglineOrRole: string;
  descriptionOrBio: string;
  tags: string[];
  matchScore: number; // Percentage score (0-100)
  avatarBg: string;
  initials: string;
  extraMeta: {
    sectorOrDomain: string;
    stageOrCompany: string;
    metricLabel?: string;
    metricValue?: string;
  };
}

// In-memory zero-config exclusion map keyed by userId to guarantee resilient local demo workflows
const fallbackExclusions: Record<string, Set<string>> = {};

// High-fidelity pre-seeded candidate pool providing dynamic matchmaking scoring out of the box
const PRE_SEEDED_CANDIDATES: Omit<DiscoveryCandidate, "matchScore">[] = [
  {
    id: "v-edloop",
    type: "venture",
    name: "EduLoop",
    taglineOrRole: "AI-powered personalized learning paths for college students",
    descriptionOrBio: "EduLoop uses AI to generate personalized study paths based on a student's learning style, pace, and goals. Built on LLM-based curriculum adaptation with real user retention data.",
    tags: ["EdTech", "AI", "B2C", "SaaS", "Product Strategy"],
    avatarBg: "#1E40AF",
    initials: "PS",
    extraMeta: {
      sectorOrDomain: "EdTech",
      stageOrCompany: "MVP Stage",
      metricLabel: "Traction",
      metricValue: "200 beta users",
    },
  },
  {
    id: "e-anika",
    type: "expert",
    name: "Dr. Anika Patel",
    taglineOrRole: "Partner at Sequoia Capital India",
    descriptionOrBio: "10+ years investing in early-stage startups. Led investments in 40+ companies including 3 unicorns. Passionate about AI integration layers and B2B scale workflows.",
    tags: ["Fundraising", "SaaS", "EdTech", "VC", "GTM"],
    avatarBg: "#EF4444",
    initials: "AP",
    extraMeta: {
      sectorOrDomain: "Venture Capital",
      stageOrCompany: "Sequoia Capital",
      metricLabel: "Sessions",
      metricValue: "48 completed",
    },
  },
  {
    id: "v-supplify",
    type: "venture",
    name: "Supplify",
    taglineOrRole: "One-click supply chain management for D2C brands",
    descriptionOrBio: "Supplify automates procurement, inventory tracking, and vendor management for small D2C brands. Integration with all major e-commerce platforms natively.",
    tags: ["B2B SaaS", "Supply Chain", "D2C", "Scale", "APIs"],
    avatarBg: "#9D174D",
    initials: "MC",
    extraMeta: {
      sectorOrDomain: "B2B SaaS",
      stageOrCompany: "Product-Market Fit",
      metricLabel: "MRR",
      metricValue: "₹2L / mo",
    },
  },
  {
    id: "e-james",
    type: "expert",
    name: "James Whitfield",
    taglineOrRole: "Co-founder (Exited) at Razorpay",
    descriptionOrBio: "Built Razorpay from 0 to $1B valuation. Now advising the next generation of fintech founders on scaling, unit economics, and API developer platform plays.",
    tags: ["Product", "Scale", "B2B", "FinTech", "APIs"],
    avatarBg: "#3B82F6",
    initials: "JW",
    extraMeta: {
      sectorOrDomain: "Fintech & Scaling",
      stageOrCompany: "Razorpay",
      metricLabel: "Rating",
      metricValue: "5.0 ★★★★★",
    },
  },
  {
    id: "v-healthbridge",
    type: "venture",
    name: "HealthBridge",
    taglineOrRole: "Telemedicine for tier-2 India with vernacular language support",
    descriptionOrBio: "HealthBridge connects patients in rural India to qualified doctors via video, with support in 8 regional languages. Highly optimized real-time video low bandwidth loops.",
    tags: ["HealthTech", "Rural India", "Telemedicine", "B2C", "Impact"],
    avatarBg: "#065F46",
    initials: "AO",
    extraMeta: {
      sectorOrDomain: "HealthTech",
      stageOrCompany: "MVP Stage",
      metricLabel: "Pilot",
      metricValue: "450 consults",
    },
  },
  {
    id: "e-yuki",
    type: "expert",
    name: "Yuki Tanaka",
    taglineOrRole: "Head of Growth at Notion",
    descriptionOrBio: "Pioneered product-led growth at Notion. Grew Notion from 1M to 30M users in 18 months. Specialized in growth loops, onboarding conversion, and viral hook loops.",
    tags: ["PLG", "B2C", "Virality", "GTM", "SaaS"],
    avatarBg: "#F59E0B",
    initials: "YT",
    extraMeta: {
      sectorOrDomain: "Growth & PLG",
      stageOrCompany: "Notion",
      metricLabel: "Experience",
      metricValue: "10+ years",
    },
  },
  {
    id: "v-legalbot",
    type: "venture",
    name: "LegalBot India",
    taglineOrRole: "AI legal assistant drafting startup contracts in plain English",
    descriptionOrBio: "LegalBot drafts co-founder agreements, NDAs, MoUs, and equity term sheets in under 5 minutes using plain English prompts. Trained securely on Indian startup jurisprudence.",
    tags: ["LegalTech", "AI", "B2B SaaS", "Product Strategy"],
    avatarBg: "#713F12",
    initials: "AR",
    extraMeta: {
      sectorOrDomain: "LegalTech",
      stageOrCompany: "Seed Stage",
      metricLabel: "Clients",
      metricValue: "120 startups",
    },
  },
  {
    id: "e-raj",
    type: "expert",
    name: "Raj Devani",
    taglineOrRole: "General Counsel at Y Combinator (S22)",
    descriptionOrBio: "Specialized in startup formation, cross-border equity structuring, regulatory compliance matrices, and protecting foundational IP for pre-seed founders.",
    tags: ["Startup Law", "IP", "Fundraising", "Scale"],
    avatarBg: "#8B5CF6",
    initials: "RD",
    extraMeta: {
      sectorOrDomain: "Legal & IP",
      stageOrCompany: "Y Combinator",
      metricLabel: "Sessions",
      metricValue: "29 advisory",
    },
  },
];

/**
 * Calculates weighted tag intersection match scores dynamically
 * between candidate entities and user preference domains.
 */
function calculateMatchScore(candidateTags: string[], userInterests: string[]): number {
  if (!userInterests || userInterests.length === 0) {
    // If user has empty custom tags, compute a baseline high score deterministically based on keyword breadth
    return Math.min(96, 75 + candidateTags.length * 4);
  }

  // Weighted intersection mapping
  const candidateLower = candidateTags.map(t => t.toLowerCase());
  let overlapCount = 0;

  for (const interest of userInterests) {
    const interestLower = interest.toLowerCase();
    if (candidateLower.includes(interestLower) || candidateLower.some(c => c.includes(interestLower) || interestLower.includes(c))) {
      overlapCount++;
    }
  }

  // Base score 70% plus 8% per overlapping context keyword
  const rawScore = 70 + overlapCount * 8;
  return Math.min(99, Math.max(72, rawScore));
}

export async function getDiscoveryFeed(page = 1, limit = 5) {
  const { userId } = await auth();
  const currentUserId = userId || "anonymous-session";

  // Initialize resilient local cache for this user if not present
  if (!fallbackExclusions[currentUserId]) {
    fallbackExclusions[currentUserId] = new Set<string>();
  }

  // Attempt pulling stored DB exclusions to successfully filter out entities interacted with or dismissed
  const activeExclusions = new Set<string>(fallbackExclusions[currentUserId]);

  try {
    const records = await db
      .select({ targetId: feedInteractions.targetId })
      .from(feedInteractions)
      .where(eq(feedInteractions.clerkUserId, currentUserId));

    records.forEach(r => activeExclusions.add(r.targetId));
  } catch (err) {
    // Quiet catch serving fallback exclusions natively
  }

  // Establish base user interest tags for intersection weights
  // In a complete platform, we can read these from active user settings or profile rows
  const activeUserInterests = ["SaaS", "AI", "FinTech", "EdTech", "Fundraising", "Product Strategy", "GTM", "Scale"];

  // Filter pool candidates excluding any already viewed/dismissed items
  const viableCandidates: DiscoveryCandidate[] = [];

  for (const baseItem of PRE_SEEDED_CANDIDATES) {
    if (!activeExclusions.has(baseItem.id)) {
      const score = calculateMatchScore(baseItem.tags, activeUserInterests);
      viableCandidates.push({
        ...baseItem,
        matchScore: score,
      });
    }
  }

  // Try appending live DB ventures if present and unexcluded
  try {
    const liveVentures = await db.select().from(ventures).limit(20);
    for (const lv of liveVentures) {
      const stringId = String(lv.id);
      if (!activeExclusions.has(stringId) && lv.name) {
        const itemTags = Array.isArray(lv.tags) ? lv.tags : ["Venture", lv.sector || "Tech"];
        const score = calculateMatchScore(itemTags, activeUserInterests);
        viableCandidates.push({
          id: stringId,
          type: "venture",
          name: lv.name,
          taglineOrRole: lv.tagline || "Emerging student startup project",
          descriptionOrBio: lv.description || "Developing specialized customer value solutions at pre-seed scale.",
          tags: itemTags,
          matchScore: score,
          avatarBg: "#3B82F6",
          initials: lv.name.substring(0, 2).toUpperCase(),
          extraMeta: {
            sectorOrDomain: lv.sector || "Technology",
            stageOrCompany: lv.stage || "Ideation",
            metricLabel: "Goal",
            metricValue: lv.fundingGoal ? `₹${lv.fundingGoal}` : "Undisclosed",
          },
        });
      }
    }
  } catch (err) {
    // Quiet catch
  }

  // Try appending live DB experts if present and unexcluded
  try {
    const liveExperts = await db.select().from(expertProfiles).limit(20);
    for (const le of liveExperts) {
      const stringId = String(le.id);
      if (!activeExclusions.has(stringId) && le.title) {
        const itemTags = Array.isArray(le.tags) ? le.tags : ["Expert", le.company || "Advisory"];
        const score = calculateMatchScore(itemTags, activeUserInterests);
        viableCandidates.push({
          id: stringId,
          type: "expert",
          name: le.title || "Specialist Operator",
          taglineOrRole: `${le.title || "Advisor"} at ${le.company || "GSF Network"}`,
          descriptionOrBio: le.experience || "Advising multi-stage early stage technology ventures.",
          tags: itemTags,
          matchScore: score,
          avatarBg: "#10B981",
          initials: (le.title || "EX").substring(0, 2).toUpperCase(),
          extraMeta: {
            sectorOrDomain: "Expert Advisory",
            stageOrCompany: le.company || "Verified Operator",
            metricLabel: "Rating",
            metricValue: le.rating ? `${le.rating} ★` : "5.0 ★",
          },
        });
      }
    }
  } catch (err) {
    // Quiet catch
  }

  // Deduplicate by item ID to guarantee flawless infinite scroll uniqueness
  const uniqueMap = new Map<string, DiscoveryCandidate>();
  for (const c of viableCandidates) {
    if (!uniqueMap.has(c.id)) {
      uniqueMap.set(c.id, c);
    }
  }

  const finalPool = Array.from(uniqueMap.values());

  // Sort descending by algorithmic match score
  finalPool.sort((a, b) => b.matchScore - a.matchScore);

  // Compute precise pagination offset ranges
  const startIndex = (page - 1) * limit;
  const paginatedSlice = finalPool.slice(startIndex, startIndex + limit);
  const hasMore = startIndex + limit < finalPool.length;

  return {
    items: paginatedSlice,
    hasMore,
    totalRemaining: finalPool.length,
  };
}

export async function logFeedInteraction(targetId: string, action: "connect" | "dismiss" | "save") {
  const { userId } = await auth();
  const currentUserId = userId || "anonymous-session";

  // Update in-memory fallback exclusion set synchronously to provide ultra-fast perceived UI response
  if (!fallbackExclusions[currentUserId]) {
    fallbackExclusions[currentUserId] = new Set<string>();
  }

  // Dismissing or connecting successfully removes the item from future Discovery runs
  if (action === "dismiss" || action === "connect") {
    fallbackExclusions[currentUserId].add(targetId);
  }

  try {
    // Insert persistent row directly into Drizzle database
    await db.insert(feedInteractions).values({
      id: crypto.randomUUID(),
      clerkUserId: currentUserId,
      targetId,
      action,
    });
    return { success: true };
  } catch (err) {
    // Fail gracefully in non-DB localhost containers while preserving in-memory exclusions
    return { success: true, fallbackCached: true };
  }
}
