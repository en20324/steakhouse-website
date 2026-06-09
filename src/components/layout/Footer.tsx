import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const FOOTER_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/reservations", label: "Reservations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border-subtle bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="group inline-flex flex-col leading-none">
              <span className="font-serif text-2xl tracking-[0.18em] text-foreground">
                MAISON
              </span>
              <span className="mt-1 text-xs font-medium uppercase tracking-[0.35em] text-accent-gold transition-colors group-hover:text-accent-amber">
                Steakhouse
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-foreground-muted">
              An intimate sanctuary of fire-grilled excellence, where every cut
              tells a story of craft, patience, and uncompromising quality.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-sm tracking-[0.2em] text-accent-gold uppercase">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-accent-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm tracking-[0.2em] text-accent-gold uppercase">
              Visit Us
            </h3>
            <ul className="mt-5 space-y-4">
              <li className="flex gap-3 text-sm text-foreground-muted">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-accent-gold"
                  aria-hidden
                />
                <span>
                  42 Ember Lane
                  <br />
                  New York, NY 10012
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground-muted">
                <Phone size={16} className="shrink-0 text-accent-gold" aria-hidden />
                <a href="tel:+12125550142" className="transition-colors hover:text-accent-gold">
                  +1 (212) 555-0142
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground-muted">
                <Mail size={16} className="shrink-0 text-accent-gold" aria-hidden />
                <a
                  href="mailto:reservations@maison-steak.com"
                  className="transition-colors hover:text-accent-gold"
                >
                  reservations@maison-steak.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm tracking-[0.2em] text-accent-gold uppercase">
              Hours
            </h3>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3 text-sm text-foreground-muted">
                <Clock size={16} className="mt-0.5 shrink-0 text-accent-gold" aria-hidden />
                <div>
                  <p>Tue – Thu: 5pm – 10pm</p>
                  <p className="mt-1">Fri – Sat: 5pm – 11pm</p>
                  <p className="mt-1">Sun: 4pm – 9pm</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row">
          <p className="text-xs tracking-wide text-foreground-muted">
            &copy; {currentYear} Maison Steakhouse. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs tracking-wide text-foreground-muted">
            <Link href="/privacy" className="transition-colors hover:text-accent-gold">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-accent-gold">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
