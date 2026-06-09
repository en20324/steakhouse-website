import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { BUSINESS, BUSINESS_ADDRESS } from "@/lib/data/business";
import { ImpressumModal, DatenschutzModal } from "@/components/layout/LegalModals";

const FOOTER_LINKS = [
  { href: "/#menu", label: "Speisekarte" },
  { href: "/#reservations", label: "Reservierung" },
  { href: "/La-Savi-Speisekarte.pdf", label: "Menükarte (PDF)" },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border-subtle bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="group inline-flex items-center">
              <Image
                src="/logo-la-savi.webp"
                alt="La Savi Steakhouse Logo"
                width={140}
                height={42}
                className="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-foreground-muted">
              Premium Steaks, Grill-Spezialitäten und Halal-Gerichte in
              Duisburg — 100&nbsp;% Halal zertifiziert.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-sm tracking-[0.2em] text-accent-gold uppercase">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-accent-gold"
                    {...(link.href.endsWith(".pdf")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm tracking-[0.2em] text-accent-gold uppercase">
              Kontakt
            </h3>
            <ul className="mt-5 space-y-4">
              <li className="flex gap-3 text-sm text-foreground-muted">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-accent-gold"
                  aria-hidden
                />
                <span>
                  {BUSINESS.street}
                  <br />
                  {BUSINESS.postalCode} {BUSINESS.city}
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground-muted">
                <Phone size={16} className="shrink-0 text-accent-gold" aria-hidden />
                <a
                  href={`tel:${BUSINESS.phoneTel}`}
                  className="transition-colors hover:text-accent-gold"
                >
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground-muted">
                <Mail size={16} className="shrink-0 text-accent-gold" aria-hidden />
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="transition-colors hover:text-accent-gold"
                >
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm tracking-[0.2em] text-accent-gold uppercase">
              Öffnungszeiten
            </h3>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3 text-sm text-foreground-muted">
                <Clock size={16} className="mt-0.5 shrink-0 text-accent-gold" aria-hidden />
                <div>
                  <p>{BUSINESS.openingHours.weekdays}</p>
                  <p className="mt-1">{BUSINESS.openingHours.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row">
          <p className="text-xs tracking-wide text-foreground-muted">
            &copy; {currentYear} {BUSINESS.legalName}. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <ImpressumModal />
            <DatenschutzModal />
          </div>
        </div>

        <p className="mt-4 text-center text-[0.65rem] leading-relaxed text-foreground-muted/60 sm:text-left">
          {BUSINESS.legalName} · {BUSINESS_ADDRESS} · USt-IdNr.{" "}
          {BUSINESS.taxId}
        </p>
      </div>
    </footer>
  );
}
