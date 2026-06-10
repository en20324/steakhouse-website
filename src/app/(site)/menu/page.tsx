import type { Metadata } from "next";
import MenuPageContent from "@/components/menu/MenuPageContent";

export const metadata: Metadata = {
  title: "Speisekarte | La Savi Steakhouse",
  description:
    "Digitale Speisekarte — Premium Steaks, Grill-Spezialitäten und Halal-Gerichte in Duisburg.",
};

export default function MenuPage() {
  return (
    <main className="flex flex-1 flex-col">
      <MenuPageContent showHeader compact={false} />
    </main>
  );
}
