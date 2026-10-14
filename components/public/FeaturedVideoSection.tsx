import { Reveal } from "@/components/public/Reveal";

export function FeaturedVideoSection() {
  return (
    <section
      id="featured-video"
      className="w-full py-16 sm:py-20 bg-white text-black scroll-mt-14 sm:scroll-mt-16 border-t border-[#e5e5e5]"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section header */}
        <Reveal>
          <div className="flex items-start gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-12 pb-4 sm:pb-6 border-b-2 border-foreground">
            <span className="text-mono text-[#737373] mt-1 text-xs sm:text-sm">[06]</span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl uppercase">
              FEATURED VIDEO
            </h2>
          </div>
        </Reveal>

        {/* Video Embed Container */}
        <Reveal delayMs={150}>
          <div className="mx-auto w-full max-w-[880px]">
            <div className="aspect-video w-full overflow-hidden border border-[#e5e5e5] bg-black">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/owqGXcxQKi4"
                title="Featured Video"
                loading="lazy"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
