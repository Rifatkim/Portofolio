"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Certificate } from "@/types";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, ArrowRight, ExternalLink, Download } from "lucide-react";

interface CertificateCarouselProps {
  certificates: Certificate[];
}

export function CertificateCarousel({ certificates }: CertificateCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const total = certificates.length;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    handler({ matches: mq.matches } as MediaQueryListEvent);

    return () => {
      window.removeEventListener("resize", handleResize);
      mq.removeEventListener("change", handler);
    };
  }, []);

  const goToPrev = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToNext = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    },
    [goToPrev, goToNext]
  );

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (total === 0) return null;

  // Single Certificate
  if (total === 1) {
    const cert = certificates[0];
    return (
      <div className="flex justify-center my-6">
        <div className="w-full max-w-[440px] bg-white border border-black shadow-sm overflow-hidden">
          {cert.thumbnail_url && (
            <div className="aspect-video w-full overflow-hidden border-b border-[#e5e5e5] bg-[#f9f9f9]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cert.thumbnail_url}
                alt={cert.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-4 sm:p-5">
            <p className="text-mono text-[#a3a3a3] text-[10px] sm:text-xs uppercase mb-1">{cert.issuer}</p>
            <h3 className="font-bold text-sm sm:text-base uppercase tracking-wide mb-2 leading-tight">
              {cert.name}
            </h3>
            <div className="flex items-center gap-2.5 text-[11px] text-[#737373] mb-3">
              {cert.issue_date && (
                <span>{formatDate(cert.issue_date, { month: "short", year: "numeric" })}</span>
              )}
              {cert.does_not_expire ? (
                <span className="font-mono">No expiry</span>
              ) : cert.expiration_date ? (
                <span>— {formatDate(cert.expiration_date, { month: "short", year: "numeric" })}</span>
              ) : null}
            </div>
            {cert.related_skills && cert.related_skills.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {cert.related_skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] border border-[#e5e5e5] px-2 py-0.5 font-mono text-[#525252] uppercase"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between pt-3 border-t border-[#e5e5e5]">
              <div className="flex items-center gap-4">
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider hover:opacity-60 transition-opacity"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {cert.allow_download && cert.pdf_url && (
                  <a
                    href={cert.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="group inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider hover:opacity-60 transition-opacity"
                  >
                    <span>Download PDF</span>
                    <Download className="w-3 h-3" />
                  </a>
                )}
              </div>
              {cert.show_credential_id && cert.credential_id && (
                <span className="text-[10px] font-mono text-[#a3a3a3]">#{cert.credential_id}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate position transform parameters for each card in the list
  const getCardStyle = (index: number) => {
    let offset = (index - activeIndex + total) % total;
    if (offset > total / 2) {
      offset -= total;
    }

    const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;

    // Active center card
    if (offset === 0) {
      return {
        transform: prefersReducedMotion ? "none" : "translate3d(0, 0, 0) scale(1)",
        opacity: 1,
        zIndex: 20,
        pointerEvents: "auto" as const,
        visibility: "visible" as const,
      };
    }

    // Previous preview (Left)
    if (offset === -1 || (total === 2 && offset === 1 && activeIndex === 1)) {
      const xDistance = isMobile ? "-76%" : isTablet ? "-82%" : "-88%";
      return {
        transform: prefersReducedMotion
          ? "none"
          : `translate3d(${xDistance}, 0, 0) scale(0.85)`,
        opacity: isMobile ? 0.35 : 0.45,
        zIndex: 10,
        pointerEvents: "auto" as const,
        visibility: "visible" as const,
      };
    }

    // Next preview (Right)
    if (offset === 1) {
      const xDistance = isMobile ? "76%" : isTablet ? "82%" : "88%";
      return {
        transform: prefersReducedMotion
          ? "none"
          : `translate3d(${xDistance}, 0, 0) scale(0.85)`,
        opacity: isMobile ? 0.35 : 0.45,
        zIndex: 10,
        pointerEvents: "auto" as const,
        visibility: "visible" as const,
      };
    }

    // Off-screen cards (Smoothly queue up outside preview area)
    const isLeftHidden = offset < 0;
    const xDistance = isLeftHidden ? "-140%" : "140%";
    return {
      transform: prefersReducedMotion
        ? "none"
        : `translate3d(${xDistance}, 0, 0) scale(0.75)`,
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none" as const,
      visibility: "hidden" as const,
    };
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Certifications carousel"
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full py-2 focus:outline-none"
    >
      {/* Carousel Sliding Stage */}
      <div className="relative flex items-center justify-center min-h-[420px] sm:min-h-[460px] md:min-h-[480px] overflow-hidden px-2 sm:px-6">
        {certificates.map((cert, index) => {
          let offset = (index - activeIndex + total) % total;
          if (offset > total / 2) offset -= total;
          const isActive = offset === 0;
          const isPrev = offset === -1 || (total === 2 && offset === 1 && activeIndex === 1);
          const isNext = offset === 1 && total > 2;
          const cardStyle = getCardStyle(index);

          const handleCardClick = () => {
            if (isPrev) goToPrev();
            else if (isNext) goToNext();
          };

          return (
            <div
              key={cert.id}
              onClick={handleCardClick}
              role={isActive ? "group" : "button"}
              tabIndex={isActive ? -1 : 0}
              aria-label={
                isActive
                  ? `Active certificate: ${cert.name}`
                  : isPrev
                  ? `Go to previous certificate: ${cert.name}`
                  : `Go to next certificate: ${cert.name}`
              }
              onKeyDown={(e) => {
                if (!isActive && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  handleCardClick();
                }
              }}
              style={{
                ...cardStyle,
                transition: prefersReducedMotion
                  ? "opacity 200ms ease"
                  : "transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms cubic-bezier(0.22, 1, 0.36, 1)",
                willChange: "transform, opacity",
              }}
              className={`absolute w-[90vw] sm:w-[380px] md:w-[420px] lg:w-[440px] bg-white border ${
                isActive ? "border-black shadow-md" : "border-[#e5e5e5] cursor-pointer hover:opacity-75 shadow-sm"
              } transition-colors select-none`}
            >
              {/* Certificate Image */}
              {cert.thumbnail_url && (
                <div className="aspect-video w-full overflow-hidden border-b border-[#e5e5e5] bg-[#f9f9f9]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cert.thumbnail_url}
                    alt={cert.name}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
              )}

              {/* Active Card Body Details (Smoothly reveals when active) */}
              <div
                className={`p-4 sm:p-5 transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-60"
                }`}
              >
                <p className="text-mono text-[#a3a3a3] text-[10px] sm:text-xs uppercase mb-1 tracking-wider">
                  {cert.issuer}
                </p>

                <h3 className="font-bold text-sm sm:text-base uppercase tracking-wide mb-2 leading-tight text-black line-clamp-2">
                  {cert.name}
                </h3>

                <div className="flex items-center gap-2.5 text-[11px] text-[#737373] mb-3">
                  {cert.issue_date && (
                    <span>{formatDate(cert.issue_date, { month: "short", year: "numeric" })}</span>
                  )}
                  {cert.does_not_expire ? (
                    <span className="font-mono">No expiry</span>
                  ) : cert.expiration_date ? (
                    <span>— {formatDate(cert.expiration_date, { month: "short", year: "numeric" })}</span>
                  ) : null}
                </div>

                {/* Related Skills Tags */}
                {cert.related_skills && cert.related_skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {cert.related_skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] border border-[#e5e5e5] px-2 py-0.5 font-mono text-[#525252] uppercase"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions Row (Enabled when active) */}
                <div
                  className={`flex items-center justify-between pt-3 border-t border-[#e5e5e5] ${
                    isActive ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {cert.credential_url && (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider hover:opacity-60 transition-opacity"
                        aria-label={`Verify credential for ${cert.name}`}
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-3 h-3 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                      </a>
                    )}
                    {cert.allow_download && cert.pdf_url && (
                      <a
                        href={cert.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="group inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider hover:opacity-60 transition-opacity"
                        aria-label={`Download PDF certificate for ${cert.name}`}
                      >
                        <span>Download PDF</span>
                        <Download className="w-3 h-3 transform group-hover:translate-y-0.5 transition-transform duration-200" />
                      </a>
                    )}
                  </div>

                  {cert.show_credential_id && cert.credential_id && (
                    <span className="text-[10px] font-mono text-[#a3a3a3] tracking-wider">
                      #{cert.credential_id}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows & Counter */}
      {total > 1 && (
        <div className="flex items-center justify-between max-w-sm sm:max-w-md mx-auto mt-6 px-4">
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous certificate"
            className="group w-12 h-12 flex items-center justify-center border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-200 ease-out" />
          </button>

          {/* Clean Editorial Slide Counter */}
          <div className="font-mono text-xs text-[#737373] tracking-widest uppercase">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="mx-2 text-[#ccc]">/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next certificate"
            className="group w-12 h-12 flex items-center justify-center border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-200 ease-out" />
          </button>
        </div>
      )}
    </div>
  );
}
