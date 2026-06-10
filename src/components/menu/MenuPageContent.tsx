"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Search } from "lucide-react";
import { MENU_DATA, formatPrice } from "@/lib/data";
import { useLanguage } from "@/context/LanguageProvider";
import { Input } from "@/components/ui/input";
import { resolveLocalized } from "@/types/menu";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

const MENU_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800&auto=format&fit=crop";

interface MenuPageContentProps {
  showHeader?: boolean;
  compact?: boolean;
}

export default function MenuPageContent({
  showHeader = true,
  compact = false,
}: MenuPageContentProps) {
  const { locale, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return MENU_DATA.items.filter((item) => {
      const matchesCategory =
        activeCategory === "all"
          ? true
          : activeCategory === "highlights"
            ? item.tags.includes("bestseller") || item.tags.includes("premium")
            : item.category === activeCategory;

      if (!query) return matchesCategory;

      const searchable = [
        ...Object.values(item.name),
        ...Object.values(item.description),
        item.number,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchable.includes(query);
    });
  }, [search, activeCategory]);

  return (
    <section
      id={compact ? "menu" : undefined}
      className={`relative w-full overflow-hidden bg-background ${compact ? "py-24 sm:py-32" : "pb-24 pt-8 sm:pb-32"}`}
      aria-labelledby="menu-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06)_0%,transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-xs font-medium uppercase tracking-[0.45em] text-accent-gold">
              {t("menu.eyebrow")}
            </p>
            <h2
              id="menu-heading"
              className="mt-4 font-serif text-4xl tracking-wide text-foreground sm:text-5xl"
            >
              {compact ? t("menu.title") : t("menu.pageTitle")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
              {t("menu.subtitle")}
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-accent-gold/25 bg-surface-elevated px-4 py-1.5 text-xs font-medium tracking-[0.15em] text-accent-gold uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" aria-hidden />
              {t("menu.halalBadge")}
            </p>
          </motion.div>
        )}

        <div className="relative mx-auto mt-10 max-w-xl">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted"
            aria-hidden
          />
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("menu.searchPlaceholder")}
            className="pl-11"
            aria-label={t("menu.searchPlaceholder")}
          />
        </div>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label={t("menu.title")}
        >
          <CategoryPill
            label={t("menu.allCategories")}
            isActive={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />
          {MENU_DATA.categories.map((category) => (
            <CategoryPill
              key={category.id}
              label={resolveLocalized(category.name, locale)}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-16 text-center text-foreground-muted"
              >
                {t("menu.noResults")}
              </motion.p>
            ) : (
              filteredItems.map((item, index) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.97 }}
                  transition={{
                    duration: 0.45,
                    ease: EASE_PREMIUM,
                    delay: index * 0.03,
                  }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1.5 hover:border-accent-gold/35 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_32px_rgba(212,175,55,0.12)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-elevated">
                    <DishImage
                      src={item.image}
                      alt={resolveLocalized(item.name, locale)}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-serif text-lg tracking-wider text-accent-gold/80">
                        {item.number}.
                      </span>
                      <span className="shrink-0 font-serif text-xl font-medium text-accent-gold">
                        {formatPrice(item.price, item.currency)}
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif text-xl tracking-wide text-foreground transition-colors group-hover:text-accent-gold-light">
                      {resolveLocalized(item.name, locale)}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
                      {resolveLocalized(item.description, locale)}
                    </p>
                    {item.allergens.length > 0 && (
                      <p className="mt-3 text-xs text-foreground-muted/70">
                        <span className="font-medium text-foreground-muted">
                          {t("menu.allergens")}:
                        </span>{" "}
                        {item.allergens.join(", ")}
                      </p>
                    )}
                  </div>
                </motion.article>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
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
            {t("menu.pdfCta")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function DishImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover transition-transform duration-700 group-hover:scale-105"
      onError={() => setImgSrc(MENU_IMAGE_FALLBACK)}
    />
  );
}

function CategoryPill({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={`relative rounded-full px-4 py-2.5 text-sm font-medium tracking-wide transition-colors duration-300 sm:px-5 ${
        isActive ? "text-[#1a1408]" : "text-foreground-muted hover:text-foreground"
      }`}
    >
      {isActive && (
        <motion.span
          layoutId="menu-page-category-pill"
          className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-gold-light via-accent-gold to-accent-gold-light shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}
