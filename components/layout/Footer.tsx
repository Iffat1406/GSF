import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = {
  Platform: [
    { label: "Connect",   href: "/connect" },
    { label: "Ventures",  href: "/ventures" },
    { label: "Experts",   href: "/experts" },
    { label: "Community", href: "/community" },
    { label: "Insights",  href: "/insights" },
  ],
  Company: [
    { label: "About",    href: "/about" },
    { label: "Careers",  href: "/careers" },
    { label: "Contact",  href: "/contact" },
    { label: "Login",    href: "/login" },
    { label: "Join Free",href: "/sign-up" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms",   href: "/terms" },
    { label: "Cookies", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--bg-canvas)", borderTopColor: "var(--border-default)" }} className="border-t">
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="md:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="logo-circle group-hover:shadow-[0_0_0_3px_rgba(91,108,255,0.2)] transition-all">
                <Image src="/gsf-logo.jpeg" alt="GSF" width={36} height={36} className="object-cover w-full h-full" />
              </div>
              <div>
                <span className="font-bold text-base tracking-tight block" style={{ color: "var(--text-primary)" }}>GSF</span>
                <span className="text-[10px] tracking-widest uppercase font-medium" style={{ color: "var(--text-muted)" }}>Global Society of Founders</span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-secondary)" }}>
              A global-first digital platform for student founders. Connect with world-class experts, list your venture, and build what matters.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(91,108,255,0.08)", border: "1px solid rgba(91,108,255,0.2)" }}>
              <span className="size-1.5 rounded-full" style={{ backgroundColor: "var(--accent-indigo)" }} />
              <span className="text-xs font-medium" style={{ color: "var(--accent-indigo)" }}>Free for 30 days · No credit card</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/global-society-of-founders"
                target="_blank" rel="noopener noreferrer" aria-label="GSF on LinkedIn"
                className="size-9 rounded-lg flex items-center justify-center transition-all hover-scale"
                style={{ border: "1px solid var(--border-default)", backgroundColor: "var(--bg-surface)" }}
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="#0077B5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                className="size-9 rounded-lg flex items-center justify-center transition-all hover-scale"
                style={{ border: "1px solid var(--border-default)", backgroundColor: "var(--bg-surface)", color: "var(--text-muted)" }}
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.629zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="size-9 rounded-lg flex items-center justify-center transition-all hover-scale"
                style={{ border: "1px solid var(--border-default)", backgroundColor: "var(--bg-surface)", color: "var(--text-muted)" }}
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTopColor: "var(--border-default)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Global Society of Founders. All rights reserved.
          </p>
          <p className="text-xs italic" style={{ color: "var(--text-muted)", fontFamily: "'Playfair Display', serif" }}>
            A Society for Founders — Not Talkers.
          </p>
        </div>
      </div>
    </footer>
  );
}
