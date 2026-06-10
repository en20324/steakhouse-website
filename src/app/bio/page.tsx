import Image from "next/image";
import { BUSINESS, BUSINESS_ADDRESS } from "@/lib/data";
import BioNavigation from "@/components/bio/BioNavigation";

export default function BioPage() {
  return (
    <main className="relative flex flex-1 flex-col items-center px-[max(1rem,env(safe-area-inset-left))] pb-[max(1.75rem,env(safe-area-inset-bottom))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(1.75rem,env(safe-area-inset-top))] sm:px-4 sm:pb-12 sm:pt-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.11)_0%,rgba(212,175,55,0.04)_38%,transparent_62%)]"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col items-center">
        <div className="flex flex-col items-center text-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-accent-gold/35 bg-surface shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_40px_rgba(212,175,55,0.14)] sm:h-28 sm:w-28 sm:shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_52px_rgba(212,175,55,0.16)]">
            <Image
              src="/logo-la-savi.webp"
              alt="La Savi Steakhouse Logo"
              fill
              priority
              sizes="112px"
              className="object-contain p-3"
            />
          </div>

          <h1 className="mt-5 font-serif text-3xl tracking-wide text-foreground sm:mt-6 sm:text-4xl">
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

        <p className="mt-auto pt-8 text-center text-[10px] uppercase tracking-[0.35em] text-foreground-muted/70 sm:pt-10">
          Premium Steaks · Duisburg
        </p>
      </div>
    </main>
  );
}
