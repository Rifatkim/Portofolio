import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { getSiteSettings } from "@/lib/actions/settings.actions";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: {
      default: settings.site_title,
      template: `%s | ${settings.site_title}`,
    },
    description: settings.seo_description || settings.site_description,
    openGraph: {
      type: "website",
      title: settings.site_title,
      description: settings.seo_description || settings.site_description,
      images: settings.seo_image_url ? [settings.seo_image_url] : [],
    },
    robots: settings.maintenance_mode
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className="w-full">
      <body className={`${inter.variable} antialiased w-full min-h-screen bg-background text-foreground`}>
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
