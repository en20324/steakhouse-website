import Image from "next/image";
import Link from "next/link";
import {
  BUSINESS,
  BUSINESS_ADDRESS,
  GOOGLE_MAPS_DIRECTIONS_URL,
} from "@/lib/data";

const BIO_LINKS = [
  {
    href: "/menu",
    label: "📜 Speisekarte öffnen",
    external: false,
  },
  {
    href: "/reservation",
    label: "🪑 Tisch reservieren",
    external: false,
  },
  {
    href: `tel:${BUSINESS.phoneTel}`,
    label: "📞 Direkt anrufen",
    external: true,
  },
  {
    href: BUSINESS.whatsapp,
    label: "💬 WhatsApp Nachricht",
    external: true,
  },
  {
    href: GOOGLE_MAPS_DIRECTIONS_URL,
    label: "📍 Route starten (Google Maps)",
    external: true,
  },
] as const;

const linkClassName =
  "flex w-full items-center justify-center rounded-2xl border border-accent-gold/45 bg-surface/80 px-5 py-4 text-center text-sm font-medium tracking-wide text-foreground shadow-[0_0_0_1px_rgba(212,175,55,0.08),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-all duration-300 hover:border-accent-gold hover:bg-accent-gold/10 hover:text-accent-gold hover:shadow-[0_0_24px_rgba(212,175,55,0.18)] active:scale-[0.98] sm:text-base";

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

        <nav
          className="mt-10 flex w-full flex-col gap-3 sm:mt-12 sm:gap-3.5"
          aria-label="Schnellzugriff"
        >
          {BIO_LINKS.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                className={linkClassName}
                {...(item.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className={linkClassName}>
                {item.label}
              </Link>
            )
          )}
        </nav>

        <p className="mt-auto pt-10 text-center text-[10px] uppercase tracking-[0.35em] text-foreground-muted/70">
          Premium Steaks · Duisburg
        </p>
      </div>
    </main>
  );
}
