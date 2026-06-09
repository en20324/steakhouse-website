"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import ContactBlock from "@/components/ContactBlock";
import QRCodeBlock from "@/components/QRCodeBlock";
import { BUSINESS } from "@/lib/data";
import { useLanguage } from "@/context/LanguageProvider";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

export default function ContactPageContent() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden bg-background pb-24 pt-8 sm:pb-32">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.45em] text-accent-gold">
            {t("contact.eyebrow")}
          </p>
          <h1 className="mt-4 font-serif text-4xl tracking-wide text-foreground sm:text-5xl">
            {t("contact.title")}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.1 }}
          className="mt-14"
        >
          <ContactBlock />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.15 }}
          className="mt-10"
        >
          <QRCodeBlock />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href={BUSINESS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm text-foreground-muted transition-colors hover:text-accent-gold"
          >
            <ExternalLink size={18} aria-hidden />
            {t("contact.instagram")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
