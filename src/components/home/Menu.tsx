"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";
import {
  MENU_CATEGORIES,
  getMenuItemsByCategory,
  type MenuCategoryId,
} from "@/lib/data/menu";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>("highlights");
  const filteredItems = getMenuItemsByCategory(activeCategory);

  return (
    <section
      id="menu"
      className="relative w-full overflow-hidden bg-background py-24 sm:py-32"
      aria-labelledby="menu-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06)_0%,transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.45em] text-accent-gold">
            La Savi Steakhouse
          </p>
          <h2
            id="menu-heading"
            className="mt-4 font-serif text-4xl tracking-wide text-foreground sm:text-5xl"
          >
            Unsere Speisekarte
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
            Premium Steaks, Grill-Spezialitäten und Halal-Gerichte — handverlesen
            und mit Leidenschaft zubereitet.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-accent-gold/25 bg-surface-elevated px-4 py-1.5 text-xs font-medium tracking-[0.15em] text-accent-gold uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" aria-hidden />
            100 % Halal zertifiziert
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          role="tablist"
          aria-label="Menükategorien"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category.id)}
                className={`relative rounded-full px-4 py-2.5 text-sm font-medium tracking-wide transition-colors duration-300 sm:px-5 ${
                  isActive
                    ? "text-[#1a1408]"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="menu-category-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-gold-light via-accent-gold to-accent-gold-light shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </button>
            );
          })}
        </motion.div>

        <motion.div
          layout
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.article
                key={item.id}
                layout
                role="tabpanel"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{
                  duration: 0.45,
                  ease: EASE_PREMIUM,
                  delay: index * 0.04,
                }}
                className="group relative flex flex-col rounded-2xl border border-border-subtle bg-surface p-6 shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1.5 hover:border-accent-gold/35 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_32px_rgba(212,175,55,0.12)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="shrink-0 font-serif text-lg tracking-wider text-accent-gold/80">
                    {item.number}
                  </span>
                  <span className="shrink-0 font-serif text-xl font-medium tracking-wide text-accent-gold">
                    {item.price}
                  </span>
                </div>

                <h3 className="mt-3 font-serif text-2xl tracking-wide text-foreground transition-colors duration-300 group-hover:text-accent-gold-light">
                  {item.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-muted">
                  {item.descriptionDe}
                </p>

                <p className="mt-2 text-xs italic leading-relaxed text-foreground-muted/70">
                  {item.descriptionEn}
                </p>

                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse at top, rgba(212,175,55,0.06) 0%, transparent 65%)",
                  }}
                  aria-hidden
                />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.15 }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/La-Savi-Speisekarte.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-accent-gold/30 bg-surface-elevated px-8 py-4 text-sm font-medium tracking-[0.1em] text-foreground transition-all duration-500 hover:border-accent-gold/55 hover:shadow-[0_0_36px_rgba(212,175,55,0.18)]"
          >
            <FileText
              size={18}
              className="text-accent-gold transition-transform duration-500 group-hover:scale-110"
              aria-hidden
            />
            Komplette Menükarte als PDF ansehen
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
