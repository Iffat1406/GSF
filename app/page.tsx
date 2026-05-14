"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IntroAnimationWrapper } from "@/components/landing/IntroAnimation";
import Link from "next/link";
import {
  Video,
  Lightbulb,
  Users,
  ArrowRight,
  Shield,
  Star,
  Crown,
} from "lucide-react";
import { showSuccess } from "@/utils/toast";

export default function HomePage() {
  return (
    <IntroAnimationWrapper>
      <Navbar />

      <main>
        <HeroSection />

        {/* Two core platforms */}
        <section className="bg-surface border-y border-border py-20">
          <div className="section-container">
            <div className="text-center mb-14">
              <h2
                className="text-4xl sm:text-5xl text-text-primary mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Two platforms. One mission.
              </h2>

              <p className="text-text-secondary text-lg max-w-xl mx-auto">
                Connect with experts who&apos;ve done it. Fund the ideas that
                will shape tomorrow.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CONNECT */}
              <div className="card p-8 card-hover group">
                <div className="size-14 rounded-2xl bg-surface-2 flex items-center justify-center mb-6 border border-border">
                  <Video className="size-7 text-[var(--accent-indigo)]" />
                </div>

                <h3
                  className="text-2xl text-text-primary mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  GSF Connect
                </h3>

                <p className="text-text-secondary leading-relaxed mb-6">
                  Book 1-on-1 video calls with world-class startup experts.
                  Continue the conversation via direct chat.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {[
                    "Live Video Calls",
                    "Expert Chat",
                    "Calendar Booking",
                    "Session Notes",
                  ].map((f) => (
                    <span key={f} className="badge badge-blue">
                      {f}
                    </span>
                  ))}
                </div>

                <Link href="/connect" className="btn-primary text-sm px-6 py-2.5">
                  Find an Expert <ArrowRight className="size-4" />
                </Link>
              </div>

              {/* VENTURES */}
              <div
                className="card p-8 card-hover"
                style={{ borderColor: "#D2C4B4" }}
              >
                <div className="size-14 rounded-2xl bg-surface-2 flex items-center justify-center mb-6 border border-border">
                  <Lightbulb className="size-7 text-text-primary" />
                </div>

                <h3
                  className="text-2xl text-text-primary mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  GSF Ventures
                </h3>

                <p className="text-text-secondary leading-relaxed mb-6">
                  Students list startup ideas with equity terms. Investors fund
                  them directly.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {[
                    "Equity Deals",
                    "Investor Network",
                    "1–2% Fee Only",
                    "Escrow Protected",
                  ].map((f) => (
                    <span key={f} className="badge badge-warm">
                      {f}
                    </span>
                  ))}
                </div>

                <Link
                  href="/ventures"
                  className="inline-flex items-center gap-2 bg-[#D2C4B4] text-[#1A2332] font-semibold px-6 py-2.5 rounded-xl hover:bg-[#AACDDC] transition-all text-sm shadow-soft-sm"
                >
                  Browse Ventures <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Toast button */}
        <div className="text-center py-4">
          <button
            onClick={() => showSuccess("Toast notification working! 🎉")}
            className="btn-primary px-6 py-3"
          >
            Test Toast
          </button>
        </div>

        {/* PRICING */}
        <section className="section-container section-padding">
          <div className="text-center mb-14">
            <h2
              className="text-4xl font-bold text-text-primary mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Choose your plan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Basic",
                price: "₹499",
                highlight: false,
                freeBadge: true,
                icon: Shield,
              },
              {
                name: "Standard",
                price: "₹999",
                highlight: true,
                icon: Star,
              },
              {
                name: "Premium",
                price: "₹1499",
                highlight: false,
                icon: Crown,
              },
            ].map((plan) => {
              const Icon = plan.icon;

              return (
                <div
                  key={plan.name}
                  className={`card p-6 flex flex-col card-hover ${
                    plan.highlight
                      ? "border-[#81A6C6] shadow-[0_4px_24px_rgba(129,166,198,0.22)]"
                      : ""
                  }`}
                >
                  {plan.highlight && (
                    <span className="badge badge-blue text-xs mb-3 w-fit">
                      Most Popular
                    </span>
                  )}

                  {plan.freeBadge && (
                    <span className="badge badge-warm text-xs mb-3 w-fit">
                      Free first 30 days
                    </span>
                  )}

                  <Icon className="size-6 mb-3" />

                  <div className="font-bold text-lg">{plan.name}</div>
                  <div className="text-2xl font-bold">{plan.price}</div>

                  <Link href="/sign-up" className="btn-primary mt-auto">
                    Choose Plan
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* EXPERTS */}
        <section className="section-padding">
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
            {[
              { initials: "AP", name: "Anika P.", role: "VC" },
              { initials: "JW", name: "James W.", role: "Founder" },
              { initials: "SM", name: "Sara M.", role: "Product" },
            ].map((e) => (
              <div
                key={e.initials}
                className="card p-3 text-center card-hover"
              >
                <div className="size-10 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold border">
                  {e.initials}
                </div>
                <div className="text-xs font-semibold">{e.name}</div>
                <div className="text-[10px] text-text-muted">{e.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="text-center py-24">
          <h2 className="text-5xl mb-4">A Society for Founders</h2>

          <Link href="/sign-up" className="btn-primary px-10 py-4">
            Join GSF Free <ArrowRight />
          </Link>
        </section>
      </main>

      <Footer />
    </IntroAnimationWrapper>
  );
}