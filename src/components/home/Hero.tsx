"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageProvider";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2400&auto=format&fit=crop",
  alt: "Premium-Steak auf offener Flamme grilliert",
} as const;

export default function Hero() {
  const { t } = useLanguage();
  const words = t("hero.headline").split(" ");

  return (
    <section
      className="relative -mt-28 flex min-h-[100dvh] w-full items-center justify-center overflow-hidden"
      aria-label="Willkommen bei La Savi Steakhouse"
    >
      <div className="absolute inset-0 bg-background">
        <motion.div
          className="absolute inset-0 will-change-transform"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{
            duration: 24,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            quality={85}
          />
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-[#050505]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.45)_55%,rgba(5,5,5,0.92)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.04)_0%,transparent_50%,rgba(232,168,56,0.03)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-36 pb-28 text-center sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_PREMIUM, delay: 0.15 }}
          className="text-xs font-medium uppercase tracking-[0.45em] text-accent-gold sm:text-sm"
        >
          {t("hero.eyebrow")}
        </motion.p>

        <h1 className="mt-8 font-serif text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.1] tracking-wide text-foreground">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.85,
                ease: EASE_PREMIUM,
                delay: 0.35 + index * 0.09,
              }}
              className="mr-[0.28em] inline-block last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_PREMIUM, delay: 1.1 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg"
        >
          {t("hero.subheadline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_PREMIUM, delay: 1.35 }}
          className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
        >
          <Link
            href="/menu"
            className="group relative w-full overflow-hidden rounded-full border border-accent-gold/35 bg-black/25 px-8 py-3.5 text-sm font-medium tracking-[0.12em] text-foreground backdrop-blur-sm transition-[box-shadow,border-color] duration-500 hover:border-accent-gold/60 hover:shadow-[0_0_32px_rgba(212,175,55,0.22)] sm:w-auto"
          >
            <span className="relative z-10">{t("hero.ctaMenu")}</span>
            <span
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, transparent 70%)",
              }}
              aria-hidden
            />
          </Link>

          <Link
            href="/reservation"
            className="w-full rounded-full bg-gradient-to-r from-accent-gold-light via-accent-gold to-accent-gold-light px-8 py-3.5 text-sm font-semibold tracking-[0.12em] text-[#1a1408] shadow-[0_4px_24px_rgba(212,175,55,0.28)] transition-[transform,box-shadow] duration-500 hover:scale-[1.02] hover:shadow-[0_6px_36px_rgba(212,175,55,0.42)] active:scale-[0.98] sm:w-auto"
          >
            {t("hero.ctaReserve")}
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE_PREMIUM, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2.2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-foreground-muted/70">
            {t("hero.scroll")}
          </span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-foreground-muted/30 p-1.5">
            <motion.span
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{
                duration: 2.2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="block h-1.5 w-1.5 rounded-full bg-accent-gold"
            />
          </div>
          <ChevronDown
            size={16}
            className="text-accent-gold/60"
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
