"use client";

import { useEffect, useRef, useCallback } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

export interface LightboxImage {
  url: string;
  alt?: string;
  caption?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  triggerRef,
}: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const total = images.length;
  const currentImage = images[currentIndex];

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus trap & Keyboard listeners
  useEffect(() => {
    if (!isOpen) return;

    // Focus close button on open
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
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
  }, [isOpen, handlePrev, handleNext, onClose]);

  // Restore focus to trigger on close
  useEffect(() => {
    if (!isOpen && triggerRef?.current) {
      triggerRef.current.focus();
    }
  }, [isOpen, triggerRef]);

  // Touch swipe support for mobile
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
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!isOpen || !currentImage) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Pratinjau gambar layar penuh"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md select-none animate-in fade-in duration-200"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Top Bar: Counter & Close button ── */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 h-16 shrink-0 border-b border-[#262626] bg-black/60"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-mono text-xs text-[#a3a3a3] tracking-widest uppercase">
          {total > 1 ? (
            <span>
              <span className="text-white font-bold">{currentIndex + 1}</span>
              <span className="mx-2 text-[#555]">/</span>
              <span>{total}</span>
            </span>
          ) : (
            <span>1 / 1</span>
          )}
        </div>

        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Tutup lightbox"
          className="min-w-11 min-h-11 w-11 h-11 flex items-center justify-center border border-[#333] rounded-xs text-white hover:bg-white hover:text-black active:scale-95 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {/* ── Center Stage: Image and Prev/Next buttons ── */}
      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-12 py-4 overflow-hidden">
        {/* Previous Button (if multiple images) */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Lihat gambar sebelumnya"
            className="absolute left-2 sm:left-6 z-10 min-w-11 min-h-11 w-11 sm:w-12 h-11 sm:h-12 flex items-center justify-center border border-[#333] bg-black/75 text-white hover:bg-white hover:text-black active:scale-95 transition-all rounded-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>
        )}

        {/* The Image (Clicking image does NOT close lightbox) */}
        <div
          className="relative max-w-full max-h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={currentImage.url}
            src={currentImage.url}
            alt={currentImage.alt || `Gambar ${currentIndex + 1}`}
            className="max-h-[75vh] sm:max-h-[80vh] max-w-[92vw] sm:max-w-[85vw] object-contain border border-[#262626] bg-[#0a0a0a] shadow-2xl transition-opacity duration-200"
          />
        </div>

        {/* Next Button (if multiple images) */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Lihat gambar berikutnya"
            className="absolute right-2 sm:right-6 z-10 min-w-11 min-h-11 w-11 sm:w-12 h-11 sm:h-12 flex items-center justify-center border border-[#333] bg-black/75 text-white hover:bg-white hover:text-black active:scale-95 transition-all rounded-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* ── Bottom Bar: Caption or Alt text ── */}
      <div
        className="px-4 sm:px-6 py-3 min-h-12 shrink-0 border-t border-[#262626] bg-black/60 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs sm:text-sm text-[#d4d4d4] font-medium max-w-3xl mx-auto truncate">
          {currentImage.caption || currentImage.alt || ""}
        </p>
      </div>
    </div>
  );
}
