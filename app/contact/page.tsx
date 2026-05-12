import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contact - GSF | Global Society of Founders",
  description: "Get in touch with the GSF team.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-[#FDFAF7]">
        <section className="relative section-padding bg-soft-pattern overflow-hidden">
          <div className="absolute inset-0 bg-dot-grid opacity-25" />
          <div className="section-container relative z-10 text-center mb-16">
            <h1 className="text-5xl text-[#1A2332] tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Get in <em className="not-italic text-gradient-primary">touch</em>
            </h1>
            <p className="text-xl text-[#4A5668] max-w-xl mx-auto">
              Questions, partnerships, or just want to say hi - we&apos;d love to hear from you.
            </p>
          </div>

          <div className="section-container relative z-10 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="space-y-5">
                {[
                  { icon: Mail, label: "Email us", value: "hello@gsf.community", sub: "We reply within 24 hours" },
                  { icon: MapPin, label: "Based in", value: "Bangalore, India", sub: "With a global community" },
                  { icon: Clock, label: "Office hours", value: "Mon-Fri, 10am-6pm IST", sub: "Or reach us on Slack" },
                ].map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} className="card p-5 flex items-start gap-4 bg-white dark:bg-slate-800">
                    <div className="size-10 rounded-xl bg-[#EEF4F9] border border-[#AACDDC] flex items-center justify-center shrink-0">
                      <Icon className="size-5 text-[#81A6C6]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#1A2332]">{label}</div>
                      <div className="text-sm text-[#4A5668] mt-0.5">{value}</div>
                      <div className="text-xs text-[#8A95A3] mt-0.5">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-2 card p-8 bg-white dark:bg-slate-800">
                <h2 className="text-lg font-semibold text-[#1A2332] mb-6">Send us a message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
