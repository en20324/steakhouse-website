import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
  title: "La Savi Steakhouse | Premium Steaks & Grill-Spezialitäten in Duisburg",
  description:
    "La Savi Steakhouse in Duisburg — 100 % Halal-zertifiziert. Premium Steaks, Grill-Spezialitäten, Döner & Lammgerichte. Untermauerstraße 4, Mo–Sa 12:00–22:00 Uhr.",
  metadataBase: new URL("https://www.lasavi.de"),
  openGraph: {
    title: "La Savi Steakhouse",
    description:
      "100 % Halal-zertifiziert. Premium Steaks, Grill-Spezialitäten und Halal-Gerichte in Duisburg.",
    type: "website",
    locale: "de_DE",
    siteName: "La Savi Steakhouse",
    url: "https://www.lasavi.de",
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
        <Header />
        <div className="flex flex-1 flex-col pt-28">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
