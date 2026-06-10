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
  "bio-action-link flex h-[52px] w-full items-center justify-center gap-3 rounded-2xl border border-accent-gold/45 bg-surface/80 px-5 text-center text-sm font-medium tracking-wide text-foreground shadow-[0_0_0_1px_rgba(212,175,55,0.08),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-all duration-300 hover:border-accent-gold hover:bg-accent-gold/10 hover:text-accent-gold hover:shadow-[0_0_24px_rgba(212,175,55,0.22)] active:scale-[0.98] motion-safe:hover:scale-[1.01] sm:text-base";

const MAP_ICON_BUTTON_CLASSNAME =
  "bio-map-icon-button group flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-accent-gold/45 bg-surface/40 backdrop-blur-sm transition-all duration-300 hover:border-accent-gold/75 hover:bg-accent-gold/[0.08] hover:shadow-[0_0_22px_rgba(212,175,55,0.32)] active:scale-[0.98] motion-safe:hover:scale-105";

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
    newTab: false as const,
  },
  {
    href: BUSINESS.whatsapp,
    label: "💬 WhatsApp Nachricht",
    external: true as const,
    newTab: true as const,
  },
] as const;

interface ExternalBioLinkProps {
  href: string;
  label: string;
  ariaLabel?: string;
  newTab?: boolean;
}

function ExternalBioLink({
  href,
  label,
  ariaLabel,
  newTab = true,
}: ExternalBioLinkProps) {
  return (
    <a
      href={href}
      className={BIO_LINK_CLASSNAME}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={ariaLabel ?? label}
    >
      {label}
    </a>
  );
}

function MapGoldIcon({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={44}
      height={44}
      sizes="44px"
      className="bio-map-icon h-11 w-11 rounded-[22%] object-cover"
      aria-hidden
    />
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
      className="mt-8 flex w-full flex-col gap-3 sm:mt-10"
      aria-label="Schnellzugriff"
    >
      {STATIC_LINKS.map((item) =>
        item.external ? (
          <ExternalBioLink
            key={item.href}
            href={item.href}
            label={item.label}
            newTab={"newTab" in item ? item.newTab : true}
          />
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

      <div className="mt-4 flex flex-col items-center gap-2.5">
        <div className="flex items-center justify-center gap-6">
          <MapProviderIconButton
            href={getAppleMapsUrl()}
            ariaLabel="In Apple Karten öffnen"
          >
            <MapGoldIcon src="/apple-maps-icon.png" />
          </MapProviderIconButton>

          <MapProviderIconButton
            href={getGoogleMapsUrl()}
            ariaLabel="In Google Maps öffnen"
          >
            <MapGoldIcon src="/google-maps-icon.jpg" />
          </MapProviderIconButton>
        </div>

        <p className="text-center text-[11px] tracking-wide text-accent-gold/65">
          Navigation mit Ihrer bevorzugten Karten-App
        </p>
      </div>
    </nav>
  );
}
