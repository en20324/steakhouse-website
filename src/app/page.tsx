import Hero from "@/components/home/Hero";
import Menu from "@/components/home/Menu";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Menu />
    </main>
  );
}
