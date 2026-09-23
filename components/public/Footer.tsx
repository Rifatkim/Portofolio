interface FooterProps {
  siteTitle: string;
  copyrightText: string;
}

export function Footer({ siteTitle, copyrightText }: FooterProps) {
  return (
    <footer className="w-full bg-foreground text-background border-t border-[#333] py-8 px-4 sm:px-6 lg:px-12">
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a3a3a3]">
          {siteTitle}
        </p>
        <p className="text-[10px] font-mono text-[#a3a3a3]">{copyrightText}</p>
      </div>
    </footer>
  );
}
