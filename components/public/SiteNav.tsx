"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#profile", label: "Profile" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#works", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav({ siteTitle }: { siteTitle: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled ? "bg-white/95 backdrop-blur-sm border-b border-[#e5e5e5]" : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-14">
          {/* Identity */}
          <Link href="/" className="text-xs font-bold uppercase tracking-[0.18em] hover:opacity-70 transition-opacity">
            {siteTitle}
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[10px] font-bold uppercase tracking-widest text-[#525252] hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 hover:bg-[#f5f5f5] transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="flex items-center justify-between px-6 h-14 border-b border-[#e5e5e5]">
            <span className="text-xs font-bold uppercase tracking-[0.18em]">{siteTitle}</span>
            <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-[#f5f5f5]" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-8">
            <ul className="space-y-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-bold uppercase tracking-wider hover:opacity-60 transition-opacity block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
