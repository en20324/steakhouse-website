"use client";

import { motion } from "framer-motion";
import { LOCALES } from "@/lib/i18n";
import { useLanguage } from "@/context/LanguageProvider";
import type { Locale } from "@/types/menu";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={cn(
        "relative flex items-center rounded-full border border-border-subtle bg-surface-elevated p-0.5",
        className
      )}
      role="group"
      aria-label="Sprache wählen"
    >
      {LOCALES.map(({ code, label }) => {
        const isActive = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code as Locale)}
            className={cn(
              "relative z-10 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider transition-colors sm:px-3 sm:text-xs",
              isActive
                ? "text-[#1a1408]"
                : "text-foreground-muted hover:text-foreground"
            )}
            aria-pressed={isActive}
          >
            {isActive && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-gold-light via-accent-gold to-accent-gold-light"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
