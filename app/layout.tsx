import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { PageTransition } from "@/components/layout/PageTransition";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Navbar } from "@/components/layout/Navbar";  // ← Changed to named import

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  // ... keep your existing metadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
        <body className="min-h-full font-sans" style={{ backgroundColor: "var(--bg-base)", color: "var(--text-primary)" }}>
          <ThemeProvider>
            <PageTransition>
              <Navbar />
              <Breadcrumb />
              {children}
            </PageTransition>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}