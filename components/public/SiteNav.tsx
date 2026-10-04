"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track scroll position for subtle shadow enhancement & active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // If user just clicked a nav link, do not let scroll listener override active section
      if (isClickScrollingRef.current) return;

      // Check if near top of page -> activate home
      if (window.scrollY < 120) {
        setActiveSection("home");
        return;
      }

      // Check if scrolled near bottom of page -> activate last section (contact)
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= docHeight - 80) {
        setActiveSection("contact");
        return;
      }

      // Active section detection by viewport position
      const headerThreshold = 150;
      const sections = NAV_LINKS.map((link) => link.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerThreshold && rect.bottom > 80) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Lock body scroll with iOS-safe scroll position restoration
  const scrollYRef = useRef(0);
  const pendingTargetRef = useRef<string | null>(null);

  useEffect(() => {
    if (mobileOpen) {
      // Save current scroll position
      scrollYRef.current = window.scrollY;
      const scrollY = scrollYRef.current;

      // Lock body at current scroll position
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Restore body styles and scroll position
      if (document.body.style.position === "fixed") {
        const savedScrollY = scrollYRef.current;
        const targetId = pendingTargetRef.current;
        pendingTargetRef.current = null;

        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        if (targetId) {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo(0, savedScrollY);
          }
        } else {
          window.scrollTo(0, savedScrollY);
        }
      }
    }

    return () => {
      // Cleanup on unmount
      if (document.body.style.position === "fixed") {
        const savedScrollY = scrollYRef.current;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, savedScrollY);
      }
    };
  }, [mobileOpen]);

  // Close menu and restore focus to hamburger
  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    setTimeout(() => {
      hamburgerRef.current?.focus();
    }, 50);
  }, []);

  const handleMobileNavClick = (targetId: string) => {
    setActiveSection(targetId);
    pendingTargetRef.current = targetId;
    isClickScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 1000);
    closeMobileMenu();
  };

  // Focus first element when drawer opens & Focus Trap
  useEffect(() => {
    if (mobileOpen) {
      // Focus close button on open
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          closeMobileMenu();
          return;
        }

        if (e.key === "Tab" && drawerRef.current) {
          const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [mobileOpen, closeMobileMenu]);

  return (
    <>
      {/* ── Fixed Sticky Top Header ────────────────────────────────────────── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e5e5e5] transition-shadow duration-300",
          scrolled ? "shadow-[0_2px_12px_rgba(0,0,0,0.06)]" : ""
        )}
      >
        <nav
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-14 sm:h-16 gap-3"
          aria-label="Main Navigation"
        >
          {/* Identity / Name Brand */}
          <Link
            href="/"
            className="text-[11px] min-[360px]:text-xs sm:text-sm font-bold uppercase tracking-[0.1em] sm:tracking-[0.18em] text-black hover:opacity-75 transition-opacity leading-snug shrink"
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
                    onClick={() => {
                      const targetId = link.href.replace("#", "");
                      setActiveSection(targetId);
                      isClickScrollingRef.current = true;
                      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
                      scrollTimeoutRef.current = setTimeout(() => {
                        isClickScrollingRef.current = false;
                      }, 1000);
                    }}
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
            ref={hamburgerRef}
            type="button"
            className="lg:hidden shrink-0 flex items-center justify-center w-11 h-11 border border-[#e5e5e5] rounded-xs bg-white text-black hover:bg-[#f5f5f5] active:scale-95 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Buka navigasi menu"
            aria-controls="mobile-nav-drawer"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </header>

      {/* ── Mobile Navigation Drawer ────────────────────────────────────────── */}
      <div
        id="mobile-nav-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        aria-hidden={!mobileOpen}
        className={cn(
          "fixed inset-0 z-50 w-full h-[100dvh] overflow-hidden overscroll-none bg-white flex flex-col lg:hidden transition-transform duration-300 ease-in-out transform",
          mobileOpen
            ? "translate-x-0 pointer-events-auto visible"
            : "translate-x-full pointer-events-none invisible"
        )}
      >
        {/* 1. Header (shrink-0) */}
        <div className="mobile-drawer-header shrink-0 flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16 border-b border-[#e5e5e5] gap-3">
          <span className="text-[11px] min-[360px]:text-xs sm:text-sm font-bold uppercase tracking-[0.1em] sm:tracking-[0.18em] text-black leading-snug shrink truncate">
            {siteTitle}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMobileMenu}
            className="shrink-0 flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] border border-[#e5e5e5] rounded-xs text-black hover:bg-[#f5f5f5] active:scale-95 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 cursor-pointer"
            aria-label="Tutup menu navigasi"
            tabIndex={mobileOpen ? 0 : -1}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* 2. Navigation (flex-1 min-h-0 flex flex-col justify-center overflow-hidden) */}
        <nav
          className="mobile-drawer-nav flex-1 min-h-0 flex flex-col justify-center overflow-hidden px-4 sm:px-6 py-2 sm:py-3"
          aria-label="Mobile Navigation Menu"
        >
          <p className="text-[9px] sm:text-[10px] font-mono text-[#737373] uppercase tracking-widest mb-1 sm:mb-2 shrink-0">
            {"// NAVIGATION"}
          </p>
          <ul className="flex flex-col justify-evenly h-full w-full">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href} className="w-full">
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileNavClick(link.href.replace("#", ""));
                    }}
                    tabIndex={mobileOpen ? 0 : -1}
                    className={cn(
                      "mobile-drawer-link group flex items-center justify-between py-1.5 sm:py-2 border-b border-[#f0f0f0] transition-colors",
                      isActive
                        ? "text-black font-extrabold"
                        : "text-[#525252] hover:text-black font-semibold"
                    )}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="font-mono text-[11px] sm:text-xs text-[#737373] group-hover:text-black transition-colors">
                        [{link.code}]
                      </span>
                      <span className="mobile-drawer-link-text text-sm sm:text-base md:text-lg uppercase tracking-wider">
                        {link.label}
                      </span>
                    </div>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#737373] group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 3. Footer (shrink-0) */}
        <div className="mobile-drawer-footer shrink-0 p-3.5 sm:p-5 border-t border-[#e5e5e5] bg-[#fafafa]">
          <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
            <span
              className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0"
              aria-hidden="true"
            />
            <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-[#525252]">
              Available for opportunities
            </span>
          </div>
          <p className="mobile-drawer-desc text-[11px] sm:text-xs text-[#737373] leading-snug">
            Informatics Engineering • Cisco Networking • Web Developer
          </p>
        </div>
      </div>
    </>
  );
}
