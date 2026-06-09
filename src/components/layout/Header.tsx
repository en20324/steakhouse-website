"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageProvider";

const NAV_HREFS = [
  { href: "/menu", key: "nav.menu" },
  { href: "/gallery", key: "nav.gallery" },
  { href: "/contact", key: "nav.contact" },
  { href: "/reservation", key: "nav.reservation" },
] as const;

export default function Header() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface-glass px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-5"
          aria-label="Hauptnavigation"
        >
          <Link
            href="/"
            className="group relative flex shrink-0 items-center"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/logo-la-savi.webp"
              alt="La Savi Steakhouse Logo"
              width={160}
              height={48}
              priority
              className="h-9 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90 sm:h-11"
            />
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_HREFS.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="relative rounded-lg px-3 py-2 text-sm font-medium tracking-wide text-foreground-muted transition-colors hover:text-foreground xl:px-4"
                >
                  <span className="relative z-10">{t(link.key)}</span>
                  <span className="absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-accent-gold-light to-accent-gold transition-transform duration-300 hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <Link
              href="/reservation"
              className="rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm font-medium tracking-wide text-accent-gold transition-all hover:border-accent-gold/40 hover:bg-accent-gold/10 hover:text-amber-400 xl:px-5"
            >
              {t("nav.reserveTable")}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-border-subtle p-2 text-foreground-muted transition-colors hover:border-border hover:text-accent-gold"
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </motion.nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mt-2 rounded-2xl border border-border bg-surface-glass p-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <ul className="flex flex-col gap-1">
                  {NAV_HREFS.map((link, index) => (
                    <motion.li
                      key={link.key}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="block rounded-lg px-4 py-3 text-base font-medium tracking-wide text-foreground-muted transition-colors hover:bg-surface-elevated hover:text-accent-gold"
                        onClick={() => setIsOpen(false)}
                      >
                        {t(link.key)}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <Link
                  href="/reservation"
                  className="mt-3 flex w-full items-center justify-center rounded-full border border-border bg-surface-elevated px-5 py-3 text-sm font-medium tracking-wide text-accent-gold transition-all hover:border-accent-gold/40 hover:bg-accent-gold/10"
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.reserveTable")}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
