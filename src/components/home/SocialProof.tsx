"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageProvider";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

const MOCK_REVIEWS = [
  {
    id: "google-1",
    source: "google" as const,
    author: "Marco S.",
    rating: 5,
    textKey: "socialProof.reviews.wagyu",
  },
  {
    id: "google-2",
    source: "google" as const,
    author: "Aylin K.",
    rating: 5,
    textKey: "socialProof.reviews.doner",
  },
  {
    id: "trustpilot-1",
    source: "trustpilot" as const,
    author: "Thomas R.",
    rating: 5,
    textKey: "socialProof.reviews.service",
  },
  {
    id: "trustpilot-2",
    source: "trustpilot" as const,
    author: "Sarah M.",
    rating: 5,
    textKey: "socialProof.reviews.atmosphere",
  },
] as const;

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} von 5 Sternen`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={14}
          className={
            index < rating
              ? "fill-accent-gold text-accent-gold"
              : "fill-transparent text-foreground-muted/30"
          }
          aria-hidden
        />
      ))}
    </div>
  );
}

function PlatformBadge({
  platform,
  label,
  rating,
  reviewCount,
  widgetPlaceholder,
}: {
  platform: "google" | "trustpilot";
  label: string;
  rating: string;
  reviewCount: string;
  widgetPlaceholder: string;
}) {
  const isGoogle = platform === "google";

  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-surface/60 px-6 py-5 text-center backdrop-blur-sm">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold ${
          isGoogle
            ? "bg-white/10 text-white"
            : "bg-[#00b67a]/15 text-[#00b67a]"
        }`}
        aria-hidden
      >
        {isGoogle ? "G" : "★"}
      </div>
      <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
        {label}
      </p>
      <p className="mt-2 font-serif text-4xl tracking-wide text-foreground">
        {rating}
      </p>
      <StarRating rating={5} />
      <p className="mt-2 text-xs text-foreground-muted">{reviewCount}</p>
      <p className="mt-3 rounded-full border border-dashed border-accent-gold/25 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-accent-gold/80">
        {widgetPlaceholder}
      </p>
    </div>
  );
}

function ReviewCard({
  author,
  rating,
  text,
  source,
  index,
}: {
  author: string;
  rating: number;
  text: string;
  source: "google" | "trustpilot";
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_PREMIUM }}
      className="flex flex-col rounded-2xl border border-border-subtle bg-surface-elevated/80 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
    >
      <div className="flex items-center justify-between gap-3">
        <StarRating rating={rating} />
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
            source === "google"
              ? "bg-white/8 text-foreground-muted"
              : "bg-[#00b67a]/10 text-[#00b67a]"
          }`}
        >
          {source === "google" ? "Google" : "Trustpilot"}
        </span>
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
        &ldquo;{text}&rdquo;
      </blockquote>
      <footer className="mt-4 text-xs font-medium tracking-wide text-accent-gold">
        — {author}
      </footer>
    </motion.article>
  );
}

export default function SocialProof() {
  const { t } = useLanguage();

  return (
    <section
      className="relative w-full overflow-hidden bg-background py-24 sm:py-32"
      aria-labelledby="social-proof-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_65%)]"
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
            {t("socialProof.eyebrow")}
          </p>
          <h2
            id="social-proof-heading"
            className="mt-4 font-serif text-4xl tracking-wide text-foreground sm:text-5xl"
          >
            {t("socialProof.title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
            {t("socialProof.subtitle")}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-3xl">
          <PlatformBadge
            platform="google"
            label={t("socialProof.google.label")}
            rating="4.9"
            reviewCount={t("socialProof.google.reviewCount")}
            widgetPlaceholder={t("socialProof.widgetPlaceholder")}
          />
          <PlatformBadge
            platform="trustpilot"
            label={t("socialProof.trustpilot.label")}
            rating="4.8"
            reviewCount={t("socialProof.trustpilot.reviewCount")}
            widgetPlaceholder={t("socialProof.widgetPlaceholder")}
          />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_REVIEWS.map((review, index) => (
            <ReviewCard
              key={review.id}
              author={review.author}
              rating={review.rating}
              text={t(review.textKey)}
              source={review.source}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
