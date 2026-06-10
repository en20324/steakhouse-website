import Image from "next/image";
import { BUSINESS, BUSINESS_ADDRESS } from "@/lib/data";
import BioNavigation from "@/components/bio/BioNavigation";

export default function BioPage() {
  return (
    <main className="relative flex flex-1 flex-col items-center px-4 py-10 sm:py-14">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.07)_0%,transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col items-center">
        <div className="flex flex-col items-center text-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border border-accent-gold/30 bg-surface shadow-[0_8px_32px_rgba(0,0,0,0.45)] sm:h-28 sm:w-28">
            <Image
              src="/logo-la-savi.webp"
              alt="La Savi Steakhouse Logo"
              fill
              priority
              sizes="112px"
              className="object-contain p-3"
            />
          </div>

          <h1 className="mt-6 font-serif text-3xl tracking-wide text-foreground sm:text-4xl">
            {BUSINESS.name}
          </h1>

          <a
            href={BUSINESS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-sm font-medium tracking-wide text-accent-gold transition-colors hover:text-accent-gold-light"
          >
            @lasavi_restaurant
          </a>

          <p className="mt-3 max-w-xs text-xs leading-relaxed text-foreground-muted">
            {BUSINESS_ADDRESS}
          </p>
        </div>

        <BioNavigation />

        <p className="mt-auto pt-10 text-center text-[10px] uppercase tracking-[0.35em] text-foreground-muted/70">
          Premium Steaks · Duisburg
        </p>
      </div>
    </main>
  );
}
