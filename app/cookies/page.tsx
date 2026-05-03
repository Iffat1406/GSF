import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = { title: "Cookies Policy — GSF", description: "How GSF uses cookies." };

const COOKIE_TYPES = [
  { name: "Strictly Necessary", examples: "Session token, login state, cookie consent preference", purpose: "Required for the platform to function. Cannot be disabled.", canDisable: false },
  { name: "Analytics", examples: "Page views, session duration, feature usage", purpose: "Help us understand how members use GSF so we can improve the experience.", canDisable: true },
  { name: "Functional", examples: "UI preferences, selected filters, notification settings", purpose: "Remember your settings and personalise your experience.", canDisable: true },
  { name: "Marketing", examples: "Ad targeting, retargeting pixels", purpose: "Allow us to show you relevant GSF content on external platforms.", canDisable: true },
];

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-[#FDFAF7]">
        <section className="section-container py-20 max-w-3xl mx-auto">
          <h1 className="text-4xl text-[#1A2332] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Cookies Policy</h1>
          <p className="text-[#8A95A3] text-sm mb-6">Last updated: April 2026</p>

          <p className="text-[#4A5668] leading-relaxed mb-10">
            GSF uses cookies and similar technologies to keep you signed in, remember your preferences, and help us understand how you use the platform. Below is a full breakdown of the cookies we use.
          </p>

          <div className="space-y-4">
            {COOKIE_TYPES.map((cookie) => (
              <div key={cookie.name} className="card p-6 flex flex-col sm:flex-row sm:items-start gap-5">
                <div className="sm:w-40 shrink-0">
                  <div className="font-semibold text-[#1A2332] text-sm">{cookie.name}</div>
                  <span className={`badge mt-2 w-fit ${cookie.canDisable ? "badge-warm" : "badge-blue"}`}>
                    {cookie.canDisable ? "Optional" : "Required"}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#4A5668] leading-relaxed mb-2">{cookie.purpose}</p>
                  <p className="text-xs text-[#8A95A3]"><span className="font-medium">Examples:</span> {cookie.examples}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#D2C4B4] pt-8 mt-10 space-y-4 text-sm text-[#4A5668]">
            <p>You can manage your cookie preferences at any time from your browser settings. Note that disabling certain cookies may affect platform functionality.</p>
            <p>For questions about our use of cookies, contact us at <a href="mailto:hello@gsf.community" className="text-[#81A6C6] hover:underline">hello@gsf.community</a>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
