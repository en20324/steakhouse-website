"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/#menu", label: "Speisekarte" },
  { href: "/#reservations", label: "Reservierung" },
  { href: "/#reservations", label: "Kontakt" },
] as const;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-surface-glass px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-6"
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
              className="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90 sm:h-12"
            />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="relative rounded-lg px-4 py-2 text-sm font-medium tracking-wide text-foreground-muted transition-colors hover:text-foreground"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-accent-gold-light to-accent-gold transition-transform duration-300 hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#reservations"
            className="hidden rounded-full border border-border bg-surface-elevated px-5 py-2 text-sm font-medium tracking-wide text-accent-gold transition-all hover:border-accent-gold/40 hover:bg-accent-gold/10 hover:text-accent-amber md:inline-flex"
          >
            Tisch reservieren
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-border-subtle p-2 text-foreground-muted transition-colors hover:border-border hover:text-accent-gold md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden md:hidden"
            >
              <div className="mt-2 rounded-2xl border border-border bg-surface-glass p-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, index) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="block rounded-lg px-4 py-3 text-base font-medium tracking-wide text-foreground-muted transition-colors hover:bg-surface-elevated hover:text-accent-gold"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <Link
                  href="/#reservations"
                  className="mt-3 flex w-full items-center justify-center rounded-full border border-border bg-surface-elevated px-5 py-3 text-sm font-medium tracking-wide text-accent-gold transition-all hover:border-accent-gold/40 hover:bg-accent-gold/10"
                  onClick={() => setIsOpen(false)}
                >
                  Tisch reservieren
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
