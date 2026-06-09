import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/app/providers";
import { BUSINESS } from "@/lib/data";
import { restaurantJsonLd } from "@/lib/seo/restaurant-schema";
import "./globals.css";

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Savi Steakhouse Duisburg | Premium Fleisch & Grill",
  description:
    "Erleben Sie meisterhaftes Handwerk am Grill in Duisburg mitten in der Innenstadt. Dry Aged Steaks, Wagyu, und 100% zertifizierter Wet Aged Döner.",
  metadataBase: new URL(BUSINESS.siteUrl),
  openGraph: {
    title: "La Savi Steakhouse Duisburg | Premium Fleisch & Grill",
    description:
      "Erleben Sie meisterhaftes Handwerk am Grill in Duisburg mitten in der Innenstadt. Dry Aged Steaks, Wagyu, und 100% zertifizierter Wet Aged Döner.",
    type: "website",
    locale: "de_DE",
    siteName: "La Savi Steakhouse",
    url: BUSINESS.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
      style={{ backgroundColor: "#050505" }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantJsonLd),
          }}
        />
      </head>
      <body
        className="flex min-h-full flex-col bg-background text-foreground"
        style={{ backgroundColor: "#050505" }}
      >
        <Providers>
          <Header />
          <div className="flex flex-1 flex-col pt-28">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
