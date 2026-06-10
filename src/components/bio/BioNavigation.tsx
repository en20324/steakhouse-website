"use client";

import Link from "next/link";
import {
  BookOpen,
  MessageCircle,
  Phone,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import {
  AppleMapsGoldIcon,
  GoogleMapsGoldIcon,
} from "@/components/bio/MapProviderIcons";
import { BUSINESS } from "@/lib/data";
import { getAppleMapsUrl, getGoogleMapsUrl } from "@/lib/maps";

/** Shared corner radius for every bio action button (incl. map buttons). */
export const BIO_BUTTON_ROUNDING = "rounded-2xl";

export const BIO_LINK_CLASSNAME =
  `bio-action-link flex h-[52px] w-full items-center justify-center ${BIO_BUTTON_ROUNDING} border border-accent-gold/45 bg-surface/80 px-5 text-sm font-medium tracking-wide text-foreground shadow-[0_0_0_1px_rgba(212,175,55,0.08),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-all duration-300 hover:border-accent-gold hover:bg-accent-gold/10 hover:text-accent-gold hover:shadow-[0_0_24px_rgba(212,175,55,0.22)] active:scale-[0.98] motion-safe:hover:scale-[1.01] sm:text-base`;

const BIO_ICON_WRAPPER_CLASSNAME =
  "mr-3 flex h-[18px] w-[18px] shrink-0 items-center justify-center text-accent-gold";

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
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <>
      <span className={BIO_ICON_WRAPPER_CLASSNAME}>{icon}</span>
      <span>{label}</span>
    </>
  );
}

function BioLucideIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <Icon
      className="h-[18px] w-[18px]"
      strokeWidth={1.75}
      aria-hidden
    />
  );
}

interface ExternalBioLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
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

export default function BioNavigation() {
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
            icon={<BioLucideIcon icon={item.icon} />}
            newTab={"newTab" in item ? item.newTab : true}
          />
        ) : (
          <Link key={item.href} href={item.href} className={BIO_LINK_CLASSNAME}>
            <BioLinkContent
              icon={<BioLucideIcon icon={item.icon} />}
              label={item.label}
            />
          </Link>
        )
      )}

      <ExternalBioLink
        href={getAppleMapsUrl()}
        label="Apple Karten"
        icon={
          <AppleMapsGoldIcon className="h-[18px] w-[18px] shrink-0 [shape-rendering:geometricPrecision]" />
        }
        ariaLabel="In Apple Karten öffnen"
      />

      <ExternalBioLink
        href={getGoogleMapsUrl()}
        label="Google Maps"
        icon={
          <GoogleMapsGoldIcon className="h-[18px] w-[18px] shrink-0 [shape-rendering:geometricPrecision]" />
        }
        ariaLabel="In Google Maps öffnen"
      />

      <p className="pt-0.5 text-center text-[11px] tracking-wide text-accent-gold/65">
        Navigation mit Ihrer bevorzugten Karten-App
      </p>
    </nav>
  );
}
