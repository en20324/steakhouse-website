"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/data";
import { useLanguage } from "@/context/LanguageProvider";
import { Button } from "@/components/ui/button";

const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`
)}&z=15&output=embed`;

export default function ContactBlock() {
  const { t } = useLanguage();
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <ul className="space-y-5">
          <li className="flex gap-4">
            <MapPin size={18} className="mt-0.5 shrink-0 text-accent-gold" aria-hidden />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent-gold">
                {t("contact.address")}
              </p>
              <p className="mt-1 text-sm text-foreground-muted">
                {BUSINESS.street}
                <br />
                {BUSINESS.postalCode} {BUSINESS.city}
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <Phone size={18} className="shrink-0 text-accent-gold" aria-hidden />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent-gold">
                {t("contact.phone")}
              </p>
              <a
                href={`tel:${BUSINESS.phoneTel}`}
                className="mt-1 block text-sm text-foreground-muted transition-colors hover:text-accent-gold"
              >
                {BUSINESS.phone}
              </a>
            </div>
          </li>
          <li className="flex gap-4">
            <Mail size={18} className="shrink-0 text-accent-gold" aria-hidden />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent-gold">
                {t("contact.email")}
              </p>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="mt-1 block text-sm text-foreground-muted transition-colors hover:text-accent-gold"
              >
                {BUSINESS.email}
              </a>
            </div>
          </li>
          <li className="flex gap-4">
            <Clock size={18} className="mt-0.5 shrink-0 text-accent-gold" aria-hidden />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent-gold">
                {t("contact.hours")}
              </p>
              <p className="mt-1 text-sm text-foreground-muted">
                {BUSINESS.openingHours.weekdays}
              </p>
              <p className="mt-1 text-sm text-foreground-muted">
                {BUSINESS.openingHours.sunday}
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
        {!mapLoaded ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center p-8 text-center sm:min-h-[320px]">
            <MapPin size={32} className="text-accent-gold/60" aria-hidden />
            <p className="mt-4 max-w-sm font-serif text-lg text-foreground">
              {t("maps.privacyNotice")}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground-muted">
              {t("maps.privacyDescription")}
            </p>
            <Button
              type="button"
              className="mt-6"
              onClick={() => setMapLoaded(true)}
            >
              {t("maps.loadMap")}
            </Button>
          </div>
        ) : (
          <iframe
            title="La Savi Steakhouse Standort"
            src={MAP_EMBED_URL}
            className="h-[280px] w-full border-0 sm:h-[320px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
