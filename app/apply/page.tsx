import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle, Clock, Users, Lightbulb } from "lucide-react";
import { ApplyForm } from "@/components/forms/ApplyForm";

export const metadata = {
  title: "Apply - GSF | Global Society of Founders",
  description: "Apply to join the GSF community. Free for your first 30 days.",
};

const PERKS = [
  { icon: CheckCircle, text: "Full platform access - Connect + Ventures" },
  { icon: Users, text: "Access to 40+ expert advisors" },
  { icon: Lightbulb, text: "List your startup idea on the Venture marketplace" },
  { icon: Clock, text: "Free for 30 days, no credit card required" },
];

export default function ApplyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-[#FDFAF7]">
        <section className="relative section-padding bg-soft-pattern overflow-hidden">
          <div className="absolute inset-0 bg-dot-grid opacity-25" />
          <div className="section-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <span className="badge badge-blue mb-4"><span className="size-1.5 rounded-full bg-[#81A6C6]" /> Applications open</span>
                  <h1 className="text-4xl sm:text-5xl text-[#1A2332] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Start your founder journey.
                  </h1>
                </div>
                <p className="text-[#4A5668] leading-relaxed">
                  Your first 30 days on GSF are completely free. Get full access to expert video calls, the venture marketplace, and our global community - no credit card needed.
                </p>
                <div className="space-y-3">
                  {PERKS.map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-[#EEF4F9] border border-[#AACDDC] flex items-center justify-center shrink-0">
                        <Icon className="size-4 text-[#81A6C6]" />
                      </div>
                      <span className="text-sm text-[#4A5668]">{text}</span>
                    </div>
                  ))}
                </div>
                <div className="card card-warm p-5">
                  <p className="text-sm text-[#4A5668] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    &ldquo;I applied on a Tuesday and had my first expert call by Thursday. GSF moved faster than I expected.&rdquo;
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="size-8 rounded-full bg-[#EEF4F9] border border-[#AACDDC] flex items-center justify-center text-xs font-bold text-[#3D74A0]">PS</div>
                    <div>
                      <div className="text-xs font-semibold text-[#1A2332]">Priya Sharma</div>
                      <div className="text-[10px] text-[#8A95A3]">Founder, EduLoop</div>
                    </div>
                  </div>
                </div>
              </div>

<<<<<<< HEAD
              <div className="lg:col-span-3 card p-8 bg-white">
=======
              {/* Right form */}
              <div className="lg:col-span-3 card p-8 bg-white dark:bg-slate-800">
>>>>>>> 37ebe4d3ed4dde1d0da84304b4ee4e344bc8ae31
                <h2 className="text-lg font-semibold text-[#1A2332] mb-6">Create your account</h2>
                <ApplyForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
