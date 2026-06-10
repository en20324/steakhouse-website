"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS } from "@/lib/data";
import {
  detectPreferredMapProvider,
  getAppleMapsUrl,
  getGoogleMapsUrl,
  getMapProviderLabel,
  getPreferredMapUrl,
  type MapProvider,
} from "@/lib/maps";

export const BIO_LINK_CLASSNAME =
  "flex w-full items-center justify-center gap-3 rounded-2xl border border-accent-gold/45 bg-surface/80 px-5 py-4 text-center text-sm font-medium tracking-wide text-foreground shadow-[0_0_0_1px_rgba(212,175,55,0.08),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-all duration-300 hover:border-accent-gold hover:bg-accent-gold/10 hover:text-accent-gold hover:shadow-[0_0_24px_rgba(212,175,55,0.18)] active:scale-[0.98] sm:text-base";

const MAP_ICON_BUTTON_CLASSNAME =
  "flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-accent-gold/20 bg-surface/40 p-1 backdrop-blur-sm transition-all duration-300 hover:border-accent-gold/55 hover:bg-accent-gold/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.22)] active:scale-[0.96]";

const STATIC_LINKS = [
  { href: "/menu", label: "📜 Speisekarte öffnen", external: false as const },
  {
    href: "/reservation",
    label: "🪑 Tisch reservieren",
    external: false as const,
  },
  {
    href: `tel:${BUSINESS.phoneTel}`,
    label: "📞 Direkt anrufen",
    external: true as const,
  },
  {
    href: BUSINESS.whatsapp,
    label: "💬 WhatsApp Nachricht",
    external: true as const,
  },
] as const;

interface ExternalBioLinkProps {
  href: string;
  label: string;
  ariaLabel?: string;
}

function ExternalBioLink({ href, label, ariaLabel }: ExternalBioLinkProps) {
  return (
    <a
      href={href}
      className={BIO_LINK_CLASSNAME}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? label}
    >
      {label}
    </a>
  );
}

function MapProviderIconButton({
  href,
  ariaLabel,
  children,
}: {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={MAP_ICON_BUTTON_CLASSNAME}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

export default function BioNavigation() {
  const [preferredProvider, setPreferredProvider] =
    useState<MapProvider>("google");
  const [primaryMapUrl, setPrimaryMapUrl] = useState(getGoogleMapsUrl());

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const provider = detectPreferredMapProvider(userAgent);
    setPreferredProvider(provider);
    setPrimaryMapUrl(getPreferredMapUrl(userAgent));
  }, []);

  const primaryMapLabel = getMapProviderLabel(preferredProvider);

  return (
    <nav
      className="mt-10 flex w-full flex-col gap-3 sm:mt-12 sm:gap-3.5"
      aria-label="Schnellzugriff"
    >
      {STATIC_LINKS.map((item) =>
        item.external ? (
          <ExternalBioLink key={item.href} href={item.href} label={item.label} />
        ) : (
          <Link key={item.href} href={item.href} className={BIO_LINK_CLASSNAME}>
            {item.label}
          </Link>
        )
      )}

      <ExternalBioLink
        href={primaryMapUrl}
        label="📍 Anfahrt planen"
        ariaLabel={`Anfahrt planen — öffnet ${primaryMapLabel}`}
      />

      <div className="flex flex-col items-center gap-2 pt-0.5">
        <div
          className="flex items-center justify-center gap-4"
          role="group"
          aria-label="Karten-App auswählen"
        >
          <MapProviderIconButton
            href={getAppleMapsUrl()}
            ariaLabel="In Apple Karten öffnen"
          >
            <Image
              src="/apple-maps-icon.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-[22%] object-cover"
              aria-hidden
            />
          </MapProviderIconButton>

          <MapProviderIconButton
            href={getGoogleMapsUrl()}
            ariaLabel="In Google Maps öffnen"
          >
            <Image
              src="/google-maps-icon.jpg"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              aria-hidden
            />
          </MapProviderIconButton>
        </div>

        <p className="text-[11px] tracking-wide text-foreground-muted/55">
          Karten-App auswählen
        </p>
      </div>
    </nav>
  );
}
