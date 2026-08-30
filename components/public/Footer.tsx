interface FooterProps {
  siteTitle: string;
  copyrightText: string;
}

export function Footer({ siteTitle, copyrightText }: FooterProps) {
  return (
    <footer className="bg-foreground text-background border-t border-[#333] py-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#555]">
          {siteTitle}
        </p>
        <p className="text-[10px] font-mono text-[#555]">{copyrightText}</p>
        <p className="text-[10px] font-mono text-[#333]">Built with Next.js</p>
      </div>
    </footer>
  );
}
