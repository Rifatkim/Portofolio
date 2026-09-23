"use client";

import { useState, useRef } from "react";
import { ProjectImage } from "@/types";
import { ImageLightbox, LightboxImage } from "./ImageLightbox";

interface ProjectGalleryProps {
  images: ProjectImage[];
  projectName: string;
}

export function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeTriggerRef = useRef<HTMLElement | null>(null);

  if (!images || images.length === 0) return null;

  const lightboxImages: LightboxImage[] = images.map((img) => ({
    url: img.image_url,
    alt: img.alt_text || projectName,
    caption: img.caption || undefined,
  }));

  const handleOpen = (index: number, e: React.MouseEvent | React.KeyboardEvent) => {
    activeTriggerRef.current = e.currentTarget as HTMLElement;
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="mt-12">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-2 border-b border-[#e5e5e5]">
          Gallery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((img, i) => (
            <div
              key={img.id}
              role="button"
              tabIndex={0}
              aria-label={`Buka gambar ${i + 1}: ${img.caption || img.alt_text || projectName}`}
              onClick={(e) => handleOpen(i, e)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpen(i, e);
                }
              }}
              className="group border border-[#e5e5e5] hover:border-black transition-all duration-200 overflow-hidden cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <div className="aspect-video w-full overflow-hidden bg-[#f9f9f9] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.image_url}
                  alt={img.alt_text || projectName}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
              </div>
              {img.caption && (
                <p className="px-3 py-2 text-xs text-[#737373] group-hover:text-black transition-colors">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <ImageLightbox
        images={lightboxImages}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setCurrentIndex(newIdx)}
        triggerRef={activeTriggerRef}
      />
    </>
  );
}
