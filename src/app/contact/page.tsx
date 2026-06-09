import type { Metadata } from "next";
import ContactPageContent from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Kontakt | La Savi Steakhouse",
  description:
    "Kontakt und Anfahrt — La Savi Steakhouse, Untermauerstraße 4, 47051 Duisburg.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ContactPageContent />
    </main>
  );
}
