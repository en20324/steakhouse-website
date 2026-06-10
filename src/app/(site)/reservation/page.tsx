import type { Metadata } from "next";
import Reservations from "@/components/home/Reservations";

export const metadata: Metadata = {
  title: "Reservierung | La Savi Steakhouse",
  description:
    "Tisch reservieren bei La Savi Steakhouse in Duisburg — online oder telefonisch.",
};

export default function ReservationPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Reservations standalone />
    </main>
  );
}
