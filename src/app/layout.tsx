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
  title: "The Prime Cut Steakhouse | Artisan Steaks. Unforgettable Nights.",
  description:
    "Premium steakhouse offering artisan dry-aged cuts, fine dining, and an unforgettable culinary experience in the heart of the city.",
  openGraph: {
    title: "The Prime Cut Steakhouse",
    description:
      "Artisan steaks, fine dining, and unforgettable nights. Reserve your table today.",
    type: "website",
    locale: "en_US",
    siteName: "The Prime Cut Steakhouse",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
