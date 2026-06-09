import type { Metadata } from "next";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Galerie | La Savi Steakhouse",
  description:
    "Einblicke in La Savi Steakhouse — Atmosphäre, Küche und Momente in Duisburg.",
};

export default function GalleryPage() {
  return (
    <main className="flex flex-1 flex-col">
      <GalleryGrid />
    </main>
  );
}
