"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Award } from "@/types";
import { formatAwardMonth } from "@/lib/utils";

interface AwardDetailModalProps {
  award: Award | null;
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function AwardDetailModal({
  award,
  isOpen,
  onClose,
  triggerRef,
}: AwardDetailModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Focus trap & Keyboard navigation (Escape key)
  useEffect(() => {
    if (!isOpen) return;

    const triggerElement = triggerRef?.current;

    // Initial focus on close button
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      // Return focus to trigger element on close
      triggerElement?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen || !award) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="award-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white border border-[#e5e5e5] rounded-xs shadow-2xl overflow-hidden focus:outline-none"
        tabIndex={-1}
      >
        {/* Modal Top Bar with Close Button */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 border-b border-[#e5e5e5] bg-[#fafafa] shrink-0">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#737373]">
            {"// AWARD DETAIL"}
          </span>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] -mr-2 text-black hover:bg-[#eaeaea] active:bg-[#dedede] transition-colors rounded-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-black cursor-pointer"
            aria-label="Tutup detail penghargaan"
          >
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider mr-1 hidden sm:inline">
              CLOSE
            </span>
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body: Photo (object-contain, uncropped) */}
        <div className="relative w-full bg-black/95 flex items-center justify-center min-h-[240px] max-h-[58vh] sm:max-h-[64vh] overflow-hidden p-2">
          {award.image_url ? (
            <div className="relative w-full h-[54vh] sm:h-[60vh] max-h-[580px]">
              <Image
                src={award.image_url}
                alt={award.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 880px"
                className="object-contain"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-[#737373] text-xs font-mono">
              [ NO PHOTO AVAILABLE ]
            </div>
          )}
        </div>

        {/* Modal Footer: Metadata & Title */}
        <div className="p-4 sm:p-6 border-t border-[#e5e5e5] bg-white shrink-0 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider bg-black text-white rounded-xs">
              [{award.placement.toUpperCase()}]
            </span>
            <span className="font-mono text-xs text-[#737373] uppercase tracking-widest">
              AWARDED / {formatAwardMonth(award.award_month)}
            </span>
          </div>

          <h3
            id="award-modal-title"
            className="font-editorial text-lg sm:text-xl lg:text-2xl uppercase tracking-wide text-black leading-snug break-words"
          >
            {award.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
