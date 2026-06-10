import type { Metadata, Viewport } from "next";
import { BUSINESS } from "@/lib/data";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: "La Savi Steakhouse | Links",
  description:
    "Speisekarte, Reservierung, Kontakt und Route — La Savi Steakhouse Duisburg.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "La Savi Steakhouse | Links",
    description:
      "Speisekarte, Reservierung, Kontakt und Route — La Savi Steakhouse Duisburg.",
    url: `${BUSINESS.siteUrl.replace(/\/$/, "")}/bio`,
    siteName: "La Savi Steakhouse",
    type: "website",
  },
};

export default function BioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[100dvh] flex-1 flex-col bg-background">
      {children}
    </div>
  );
}
