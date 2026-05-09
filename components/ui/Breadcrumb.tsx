"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const routeNames: Record<string, string> = {
  experts: "Experts",
  ventures: "Ventures",
  connect: "Connect",
  community: "Community",
  dashboard: "Dashboard",
  bookings: "Bookings",
  profile: "Profile",
  about: "About",
  careers: "Careers",
  contact: "Contact",
  privacy: "Privacy",
  terms: "Terms",
  login: "Login",
  "sign-up": "Sign Up",
  register: "Register",
  apply: "Apply",
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Don't show breadcrumb on home page
  if (segments.length === 0) return null;

  return (
    <nav className="py-2.5 px-4 sm:px-6 lg:px-8 bg-background border-b border-border transition-all duration-300">
      <ol className="flex items-center flex-wrap gap-1 text-xs sm:text-sm">
        <li>
          <Link href="/" className="text-text-muted hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
            Home
          </Link>
        </li>

        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;
          const displayName = routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

          return (
            <li key={href} className="flex items-center gap-1">
              <span className="text-text-muted/50 select-none">/</span>
              {isLast ? (
                <span className="text-text-primary font-medium">
                  {displayName}
                </span>
              ) : (
                <Link href={href} className="text-text-muted hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}