import Hero from "@/components/home/Hero";
import Menu from "@/components/home/Menu";
import SocialProof from "@/components/home/SocialProof";
import Reservations from "@/components/home/Reservations";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <SocialProof />
      <Menu />
      <Reservations />
    </main>
  );
}
