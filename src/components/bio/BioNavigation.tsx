"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ChevronDown,
  MapPin,
  MessageCircle,
  Phone,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { BUSINESS } from "@/lib/data";
import {
  detectPreferredMapProvider,
  getAppleMapsUrl,
  getGoogleMapsUrl,
  type MapProvider,
} from "@/lib/maps";

export const BIO_LINK_CLASSNAME =
  "bio-action-link flex h-[52px] w-full items-center justify-center rounded-2xl border border-accent-gold/45 bg-surface/80 px-5 text-sm font-medium tracking-wide text-foreground shadow-[0_0_0_1px_rgba(212,175,55,0.08),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-all duration-300 hover:border-accent-gold hover:bg-accent-gold/10 hover:text-accent-gold hover:shadow-[0_0_24px_rgba(212,175,55,0.22)] active:scale-[0.98] motion-safe:hover:scale-[1.01] sm:text-base";

const BIO_ICON_CLASSNAME =
  "mr-3 h-[18px] w-[18px] shrink-0 text-accent-gold";

const MAP_MENU_ITEM_CLASSNAME =
  "flex h-11 w-full items-center justify-center rounded-xl px-4 text-sm tracking-wide transition-all duration-300";

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

const MAP_OPTIONS = [
  {
    provider: "google" as const,
    label: "Mit Google Maps öffnen",
    href: getGoogleMapsUrl(),
  },
  {
    provider: "apple" as const,
    label: "Mit Apple Karten öffnen",
    href: getAppleMapsUrl(),
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

function MapDirectionsPicker() {
  const [preferredProvider, setPreferredProvider] =
    useState<MapProvider>("google");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPreferredProvider(detectPreferredMapProvider(navigator.userAgent));
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(BIO_LINK_CLASSNAME, "relative")}
          aria-label="Anfahrt planen — Karten-App auswählen"
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <BioLinkContent icon={MapPin} label="Anfahrt planen" />
          <ChevronDown
            className={cn(
              "absolute right-5 h-4 w-4 text-accent-gold/70 transition-transform duration-300",
              open && "rotate-180"
            )}
            aria-hidden
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="center"
        role="menu"
        aria-label="Karten-App auswählen"
      >
        {MAP_OPTIONS.map((option) => (
          <a
            key={option.provider}
            href={option.href}
            role="menuitem"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              MAP_MENU_ITEM_CLASSNAME,
              option.provider === preferredProvider
                ? "bg-accent-gold/10 text-accent-gold"
                : "text-accent-gold/75 hover:bg-accent-gold/[0.08] hover:text-accent-gold"
            )}
            onClick={() => setOpen(false)}
          >
            {option.label}
          </a>
        ))}
      </PopoverContent>
    </Popover>
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
            icon={item.icon}
            newTab={"newTab" in item ? item.newTab : true}
          />
        ) : (
          <Link key={item.href} href={item.href} className={BIO_LINK_CLASSNAME}>
            <BioLinkContent icon={item.icon} label={item.label} />
          </Link>
        )
      )}

      <MapDirectionsPicker />
    </nav>
  );
}
