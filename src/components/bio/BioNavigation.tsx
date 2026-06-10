"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  MapPin,
  MessageCircle,
  Phone,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
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
  "bio-action-link flex h-[52px] w-full items-center justify-center rounded-2xl border border-accent-gold/45 bg-surface/80 px-5 text-sm font-medium tracking-wide text-foreground shadow-[0_0_0_1px_rgba(212,175,55,0.08),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-all duration-300 hover:border-accent-gold hover:bg-accent-gold/10 hover:text-accent-gold hover:shadow-[0_0_24px_rgba(212,175,55,0.22)] active:scale-[0.98] motion-safe:hover:scale-[1.01] sm:text-base";

const BIO_ICON_CLASSNAME =
  "mr-3 h-[18px] w-[18px] shrink-0 text-accent-gold";

const STATIC_LINKS = [
  {
    href: "/menu",
    label: "Speisekarte öffnen",
    icon: BookOpen,
    external: false as const,
  },
  {
    href: "/reservation",
    label: "Tisch reservieren",
    icon: UtensilsCrossed,
    external: false as const,
  },
  {
    href: `tel:${BUSINESS.phoneTel}`,
    label: "Direkt anrufen",
    icon: Phone,
    external: true as const,
    newTab: false as const,
  },
  {
    href: BUSINESS.whatsapp,
    label: "WhatsApp Nachricht",
    icon: MessageCircle,
    external: true as const,
    newTab: true as const,
  },
] as const;

function BioLinkContent({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <>
      <Icon
        className={BIO_ICON_CLASSNAME}
        strokeWidth={1.75}
        aria-hidden
      />
      <span>{label}</span>
    </>
  );
}

interface ExternalBioLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  ariaLabel?: string;
  newTab?: boolean;
}

function ExternalBioLink({
  href,
  label,
  icon,
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
      <BioLinkContent icon={icon} label={label} />
    </a>
  );
}

const MAP_ALT_LINK_CLASSNAME =
  "text-[11px] tracking-wide text-accent-gold/65 transition-colors duration-300 hover:text-accent-gold";

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
            icon={item.icon}
            newTab={"newTab" in item ? item.newTab : true}
          />
        ) : (
          <Link key={item.href} href={item.href} className={BIO_LINK_CLASSNAME}>
            <BioLinkContent icon={item.icon} label={item.label} />
          </Link>
        )
      )}

      <ExternalBioLink
        href={primaryMapUrl}
        label="Anfahrt planen"
        icon={MapPin}
        ariaLabel={`Anfahrt planen — öffnet ${primaryMapLabel}`}
      />

      <div className="mt-1 flex items-center justify-center gap-3">
        <a
          href={getAppleMapsUrl()}
          className={MAP_ALT_LINK_CLASSNAME}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="In Apple Karten öffnen"
        >
          Apple Karten
        </a>
        <span className="text-accent-gold/30" aria-hidden>
          ·
        </span>
        <a
          href={getGoogleMapsUrl()}
          className={MAP_ALT_LINK_CLASSNAME}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="In Google Maps öffnen"
        >
          Google Maps
        </a>
      </div>
    </nav>
  );
}
