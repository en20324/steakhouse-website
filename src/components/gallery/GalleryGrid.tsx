"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { BUSINESS } from "@/lib/data";
import { useLanguage } from "@/context/LanguageProvider";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200&auto=format&fit=crop",
    alt: "Premium Steak vom Grill",
  },
  {
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop",
    alt: "Grill-Spezialitäten",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    alt: "Restaurant-Atmosphäre",
  },
  {
    src: "https://images.unsplash.com/photo-1615937657715-bc7b4b796122?q=80&w=1200&auto=format&fit=crop",
    alt: "Wagyu Steak",
  },
  {
    src: "https://images.unsplash.com/photo-1574484284002-952d92456991?q=80&w=1200&auto=format&fit=crop",
    alt: "Orientalisches Dessert",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    alt: "Elegantes Interieur",
  },
] as const;

export default function GalleryGrid() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden bg-background pb-24 pt-8 sm:pb-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.45em] text-accent-gold">
            {t("gallery.eyebrow")}
          </p>
          <h1 className="mt-4 font-serif text-4xl tracking-wide text-foreground sm:text-5xl">
            {t("gallery.title")}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
            {t("gallery.subtitle")}
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: index * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface ${
                index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  index === 0 ? "aspect-[16/10] sm:aspect-auto sm:min-h-[420px]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 640px) 100vw, 66vw"
                      : "(max-width: 640px) 100vw, 33vw"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="mt-12 flex justify-center"
        >
          <Link
            href={BUSINESS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-accent-gold/30 bg-surface-elevated px-8 py-4 text-sm font-medium tracking-[0.1em] text-foreground transition-all hover:border-accent-gold/55 hover:shadow-[0_0_36px_rgba(212,175,55,0.18)]"
          >
            <ExternalLink size={18} className="text-accent-gold" aria-hidden />
            {t("gallery.followInstagram")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
