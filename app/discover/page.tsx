"use client";

import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, Bookmark, X, TrendingUp, UserPlus, Flame, Layers, Eye } from "lucide-react";
import { getDiscoveryFeed, logFeedInteraction, type DiscoveryCandidate } from "@/app/actions/discover";
import Link from "next/link";

export default function DiscoverPage() {
  const [items, setItems] = useState<DiscoveryCandidate[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [connectedIds, setConnectedIds] = useState<string[]>([]);

  // Infinite scroll intersection observer ref
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadFeed = async (targetPage: number, append = false) => {
    setLoading(true);
    try {
      const res = await getDiscoveryFeed(targetPage, 5);
      if (res && Array.isArray(res.items)) {
        setItems(prev => append ? [...prev, ...res.items] : res.items);
        setHasMore(res.hasMore);
      }
    } catch (err) {
      // Keep existing items if network flaky
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    loadFeed(1, false);
  }, []);

  // Intersection Observer for robust infinite scrolling trigger
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const nextPage = page + 1;
          setPage(nextPage);
          loadFeed(nextPage, true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore, loading, page]);

  // Handle Dismiss action with optimistic UI pruning
  const handleDismiss = async (id: string) => {
    // Graceful Framer Motion exit animation triggers instantly
    setItems(prev => prev.filter(item => item.id !== id));
    try {
      await logFeedInteraction(id, "dismiss");
    } catch (err) {
      // Quiet fallback
    }
  };

  // Handle Connect action with success feedback
  const handleConnect = async (id: string) => {
    if (connectedIds.includes(id)) return;
    setConnectedIds(prev => [...prev, id]);

    // Background push to real-time interaction logs
    logFeedInteraction(id, "connect").catch(() => {});

    // Automatically slide item out smoothly after showing success state to preserve pristine discovery
    setTimeout(() => {
      setItems(prev => prev.filter(item => item.id !== id));
    }, 1400);
  };

  // Handle Save toggle bookmarking
  const handleSave = async (id: string) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    logFeedInteraction(id, "save").catch(() => {});
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-[#FDFAF7]">
        {/* Header section */}
        <section className="relative section-padding pb-8 bg-soft-pattern border-b border-[#D2C4B4]">
          <div className="absolute inset-0 bg-dot-grid opacity-25" />
          <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
            <span className="badge badge-warm mb-4 inline-flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-amber-600" /> Algorithmic Discovery Engine
            </span>
            <h1 className="text-4xl sm:text-5xl text-[#1A2332] tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Tailored for Your Growth
            </h1>
            <p className="text-base sm:text-lg text-[#4A5668] leading-relaxed max-w-2xl mx-auto">
              Proactively matching you with high-potential ventures and verified operators based on shared expertise, stage context, and your active platform intent.
            </p>
          </div>
        </section>

        {/* Discovery Feed container */}
        <section className="section-container max-w-2xl mx-auto py-12">
          {items.length === 0 && !loading ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#D2C4B4] p-8 shadow-soft-sm">
              <Layers className="size-12 text-[#D2C4B4] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#1A2332] mb-2">You&apos;re completely up to date!</h3>
              <p className="text-sm text-[#8A95A3] mb-6 max-w-md mx-auto">
                We have filtered out all items you have already connected with or dismissed. Check back later as our engine surfaces fresh multi-sector additions continuously.
              </p>
              <button onClick={() => { setPage(1); loadFeed(1, false); }} className="btn-outline text-xs py-2 px-4">
                Reset preferences loop
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence>
                {items.map((item) => {
                  const isConnected = connectedIds.includes(item.id);
                  const isSaved = savedIds.includes(item.id);

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -120, scale: 0.9, transition: { duration: 0.2 } }}
                      className="card bg-white p-6 sm:p-8 rounded-3xl border border-[#D2C4B4] shadow-soft-sm relative overflow-hidden group"
                    >
                      {/* Top ribbon: match score + dismiss button */}
                      <div className="flex items-center justify-between gap-4 mb-5">
                        <div className="flex items-center gap-2">
                          <span className="badge font-bold text-xs sm:text-sm px-3 py-1 shadow-xs border"
                            style={{
                              backgroundColor: item.matchScore > 85 ? "#FEF3C7" : "#F3E3D0",
                              color: item.matchScore > 85 ? "#92400E" : "#4A5668",
                              borderColor: item.matchScore > 85 ? "#FCD34D" : "#D2C4B4",
                            }}
                          >
                            🎯 {item.matchScore}% Match
                          </span>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#F7F2EC] text-[#8A95A3] uppercase tracking-wider">
                            {item.type}
                          </span>
                        </div>

                        {/* Dismiss button */}
                        <button
                          onClick={() => handleDismiss(item.id)}
                          className="p-1.5 rounded-full hover:bg-[#F7F2EC] text-[#8A95A3] hover:text-[#1A2332] transition-colors"
                          title="Dismiss recommendation"
                        >
                          <X className="size-4" />
                        </button>
                      </div>

                      {/* Candidate Avatar & Core Identity */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="size-14 sm:size-16 rounded-2xl flex items-center justify-center text-lg sm:text-xl font-bold text-white shrink-0 shadow-inner"
                          style={{ background: `linear-gradient(135deg, ${item.avatarBg}, #1A2332)` }}
                        >
                          {item.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h2 className="text-lg sm:text-xl font-bold text-[#1A2332] truncate">
                            {item.name}
                          </h2>
                          <p className="text-xs sm:text-sm font-semibold text-[#3D74A0] line-clamp-1 mt-0.5">
                            {item.taglineOrRole}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-[#8A95A3]">
                            <span>{item.extraMeta.sectorOrDomain}</span>
                            <span>•</span>
                            <span className="font-medium text-[#4A5668]">{item.extraMeta.stageOrCompany}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bio or Description paragraph */}
                      <p className="text-xs sm:text-sm text-[#4A5668] leading-relaxed mb-5 line-clamp-3">
                        {item.descriptionOrBio}
                      </p>

                      {/* Metric block if present */}
                      {item.extraMeta.metricLabel && (
                        <div className="bg-[#F7F2EC] border border-[#D2C4B4] rounded-xl p-3 inline-flex items-center gap-3 mb-5">
                          <span className="text-[10px] text-[#8A95A3] uppercase tracking-wider font-bold">
                            {item.extraMeta.metricLabel}:
                          </span>
                          <span className="text-xs font-bold text-[#1A2332]">
                            {item.extraMeta.metricValue}
                          </span>
                        </div>
                      )}

                      {/* Overlapping Tags list */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs text-[#4A5668] bg-[#F3E3D0] border border-[#D2C4B4] px-2.5 py-0.5 rounded-full font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action triggers bottom row */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#D2C4B4] gap-2">
                        {/* Save toggle button */}
                        <button
                          onClick={() => handleSave(item.id)}
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-xl transition-colors ${isSaved ? 'text-amber-600 bg-amber-50' : 'text-[#8A95A3] hover:text-[#1A2332] hover:bg-[#F7F2EC]'}`}
                        >
                          <Bookmark className={`size-3.5 ${isSaved ? 'fill-amber-600' : ''}`} />
                          {isSaved ? "Saved" : "Save"}
                        </button>

                        {/* Primary Connect Handshake */}
                        <button
                          onClick={() => handleConnect(item.id)}
                          disabled={isConnected}
                          className={`btn-primary py-2 px-5 text-xs sm:text-sm transition-all ${isConnected ? '!bg-green-600 !border-green-600 !text-white' : ''}`}
                        >
                          {isConnected ? (
                            <>
                              <Check className="size-4 animate-bounce" /> Handshake Sent
                            </>
                          ) : item.type === "venture" ? (
                            <>
                              <TrendingUp className="size-3.5" /> Connect & Fund
                            </>
                          ) : (
                            <>
                              <UserPlus className="size-3.5" /> Connect Operator
                            </>
                          )}
                        </button>
                      </div>

                      {/* Success state overlay preview line */}
                      {isConnected && (
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-green-500 animate-pulse" />
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Infinite Scroll trigger area */}
              <div ref={observerTarget} className="py-6 text-center">
                {loading && (
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8A95A3]">
                    <div className="size-4 rounded-full border-2 border-[#81A6C6] border-t-transparent animate-spin" />
                    Surfacing higher precision matches...
                  </div>
                )}
                {!hasMore && items.length > 0 && (
                  <p className="text-xs text-[#8A95A3]">You have reached the end of your discovery funnel.</p>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
