"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { href: "#home", label: "Home", code: "00" },
  { href: "#profile", label: "Profile", code: "01" },
  { href: "#capabilities", label: "Capabilities", code: "02" },
  { href: "#works", label: "Projects", code: "03" },
  { href: "#experience", label: "Experience", code: "04" },
  { href: "#certifications", label: "Certificates", code: "05" },
  { href: "#contact", label: "Contact", code: "06" },
];

export function SiteNav({ siteTitle }: { siteTitle: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll position for subtle shadow enhancement & active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Simple active section detection
      const sections = NAV_LINKS.map((link) => link.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <>
      {/* ── Fixed Sticky Top Header ────────────────────────────────────────── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e5e5e5] transition-shadow duration-300",
          scrolled ? "shadow-[0_2px_12px_rgba(0,0,0,0.06)]" : ""
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-14 sm:h-16">
          {/* Identity / Name Brand */}
          <Link
            href="/"
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-black hover:opacity-75 transition-opacity truncate max-w-[220px] sm:max-w-none"
          >
            {siteTitle}
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "text-[11px] font-bold uppercase tracking-widest transition-colors py-1 relative",
                      isActive
                        ? "text-black"
                        : "text-[#737373] hover:text-black"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-black rounded-full" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile / Tablet Hamburger Button (Garis Tiga) */}
          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-10 h-10 border border-[#e5e5e5] rounded-xs bg-white text-black hover:bg-[#f5f5f5] active:scale-95 transition-all"
            onClick={() => setMobileOpen(true)}
            aria-label="Buka navigasi menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* ── Mobile Navigation Drawer ────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-[#e5e5e5]">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-black truncate max-w-[200px]">
                {siteTitle}
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-9 h-9 border border-[#e5e5e5] rounded-xs text-black hover:bg-[#f5f5f5] active:scale-95 transition-all"
                aria-label="Tutup menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <p className="text-[10px] font-mono text-[#a3a3a3] uppercase tracking-widest mb-6">
                {"// NAVIGATION"}
              </p>
              <ul className="space-y-4">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "group flex items-center justify-between py-2 border-b border-[#f0f0f0] transition-colors",
                          isActive ? "text-black font-extrabold" : "text-[#525252] hover:text-black font-semibold"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-[#a3a3a3] group-hover:text-black transition-colors">
                            [{link.code}]
                          </span>
                          <span className="text-lg uppercase tracking-wider">
                            {link.label}
                          </span>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-[#a3a3a3] group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-[#e5e5e5] bg-[#fafafa]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#525252]">
                  Available for opportunities
                </span>
              </div>
              <p className="text-xs text-[#737373]">
                Informatics Engineering • Cisco Networking • Web Developer
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
