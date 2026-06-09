"use client";

import { LOCALES } from "@/lib/i18n";
import { useLanguage } from "@/context/LanguageProvider";
import type { UILocale } from "@/types/menu";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={cn(
        "relative flex items-center rounded-full border border-border-subtle bg-surface-elevated/90 p-0.5 backdrop-blur-sm",
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
            onClick={() => setLocale(code as UILocale)}
            className={cn(
              "relative rounded-full px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider transition-all duration-300 sm:px-3 sm:text-xs",
              isActive
                ? "bg-[#f5f5f0] text-[#1a1408] shadow-[0_0_16px_rgba(212,175,55,0.35)] ring-1 ring-[#D4AF37]/70"
                : "text-foreground-muted hover:text-[#D4AF37]"
            )}
            aria-pressed={isActive}
          >
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
