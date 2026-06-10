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

const MAP_APP_ICON_LINK_CLASSNAME =
  "inline-flex shrink-0 transition-transform duration-200 hover:scale-105";

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

function MapAppIconLink({
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
      className={MAP_APP_ICON_LINK_CLASSNAME}
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

      <div className="mt-3 flex items-center justify-center gap-5">
        <MapAppIconLink
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
        </MapAppIconLink>

        <MapAppIconLink
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
        </MapAppIconLink>
      </div>
    </nav>
  );
}
