"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { Award } from "@/types";
import { formatAwardMonth, cn } from "@/lib/utils";
import { AwardDetailModal } from "./AwardDetailModal";
import { Reveal } from "./Reveal";

interface AwardsGalleryProps {
  awards: Award[];
}

export function AwardsGallery({ awards }: AwardsGalleryProps) {
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const activeTriggerRef = useRef<HTMLElement | null>(null);

  if (!awards || awards.length === 0) return null;

  const handleOpenModal = (
    award: Award,
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    activeTriggerRef.current = e.currentTarget;
    setSelectedAward(award);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setSelectedAward(null);
    }, 200);
  };

  const isSingle = awards.length === 1;

  return (
    <>
      <div
        className={cn(
          "w-full",
          isSingle
            ? "flex justify-center"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        )}
      >
        {awards.map((award, index) => (
          <div
            key={award.id}
            className={cn(
              "w-full",
              isSingle && "max-w-md sm:max-w-lg"
            )}
          >
            <Reveal delayMs={index * 100}>
              <article className="group h-full flex flex-col bg-white border border-[#e5e5e5] rounded-xs overflow-hidden transition-all duration-300 hover:border-black/50">
                {/* Photo with VIEW FULL hover overlay */}
                <button
                  type="button"
                  onClick={(e) => handleOpenModal(award, e)}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-black/5 block cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  aria-label={`Buka foto penuh untuk penghargaan ${award.title} (${award.placement})`}
                >
                  {award.image_url ? (
                    <Image
                      src={award.image_url}
                      alt={award.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#737373] text-xs font-mono">
                      [ NO PHOTO ]
                    </div>
                  )}

                  {/* Darkened overlay with "VIEW FULL" text */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-center justify-center pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/80 bg-black/70 text-white rounded-xs transform translate-y-1 group-hover:translate-y-0 transition-transform duration-250">
                      <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-widest">
                        VIEW FULL
                      </span>
                    </div>
                  </div>
                </button>

                {/* Card Content: Placement, Date, Title */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="inline-flex items-center px-2 py-0.5 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-black text-white rounded-xs">
                        {award.placement}
                      </span>
                      <time className="text-[11px] font-mono text-[#737373] uppercase tracking-wider">
                        {formatAwardMonth(award.award_month)}
                      </time>
                    </div>

                    <h3 className="font-editorial text-base sm:text-lg uppercase text-black leading-snug break-words">
                      {award.title}
                    </h3>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal Detail */}
      <AwardDetailModal
        award={selectedAward}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        triggerRef={activeTriggerRef}
      />
    </>
  );
}
