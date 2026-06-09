"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/data";
import { useLanguage } from "@/context/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
}

const INITIAL_FORM: ReservationFormData = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
};

const GUEST_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"] as const;

const selectClassName = cn(
  "flex h-11 w-full appearance-none rounded-xl border border-border-subtle bg-surface-elevated px-4 py-2 text-sm text-foreground transition-colors focus-visible:border-accent-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/20"
);

interface ReservationsProps {
  standalone?: boolean;
}

function RequiredLabel({
  htmlFor,
  children,
  requiredHint,
}: {
  htmlFor: string;
  children: string;
  requiredHint: string;
}) {
  return (
    <Label htmlFor={htmlFor}>
      {children}{" "}
      <span className="text-[#D4AF37]" aria-hidden="true">
        *
      </span>
      <span className="sr-only"> ({requiredHint})</span>
    </Label>
  );
}

export default function Reservations({ standalone = false }: ReservationsProps) {
  const { t } = useLanguage();
  const [form, setForm] = useState<ReservationFormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: keyof ReservationFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!event.currentTarget.checkValidity()) {
      return;
    }

    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id={standalone ? undefined : "reservations"}
      className={`relative w-full overflow-hidden bg-background ${standalone ? "pb-24 pt-8 sm:pb-32" : "py-24 sm:py-32"}`}
      aria-labelledby="reservations-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.05)_0%,transparent_60%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.45em] text-accent-gold">
            {t("reservation.eyebrow")}
          </p>
          <h2
            id="reservations-heading"
            className="mt-4 font-serif text-4xl tracking-wide text-foreground sm:text-5xl"
          >
            {t("reservation.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-foreground-muted">
            {t("reservation.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.1 }}
          className="mt-12 rounded-2xl border border-accent-gold/20 bg-[#0a0a0a] p-6 shadow-[0_8px_48px_rgba(0,0,0,0.5),0_0_48px_rgba(212,175,55,0.06)] sm:p-10"
        >
          {submitted ? (
            <div className="py-8 text-center">
              <p className="font-serif text-2xl text-accent-gold">
                {t("reservation.successTitle")}
              </p>
              <p className="mt-3 text-sm text-foreground-muted">
                {t("reservation.successMessage")}
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-8"
                onClick={() => {
                  setSubmitted(false);
                  setForm(INITIAL_FORM);
                }}
              >
                {t("reservation.newReservation")}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <RequiredLabel
                    htmlFor="name"
                    requiredHint={t("reservation.required")}
                  >
                    {t("reservation.name")}
                  </RequiredLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={t("reservation.namePlaceholder")}
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <RequiredLabel
                    htmlFor="email"
                    requiredHint={t("reservation.required")}
                  >
                    {t("reservation.email")}
                  </RequiredLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={t("reservation.emailPlaceholder")}
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <RequiredLabel
                    htmlFor="phone"
                    requiredHint={t("reservation.required")}
                  >
                    {t("reservation.phone")}
                  </RequiredLabel>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder={t("reservation.phonePlaceholder")}
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <RequiredLabel
                    htmlFor="date"
                    requiredHint={t("reservation.required")}
                  >
                    {t("reservation.date")}
                  </RequiredLabel>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <RequiredLabel
                    htmlFor="time"
                    requiredHint={t("reservation.required")}
                  >
                    {t("reservation.time")}
                  </RequiredLabel>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    required
                    value={form.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <RequiredLabel
                    htmlFor="guests"
                    requiredHint={t("reservation.required")}
                  >
                    {t("reservation.guests")}
                  </RequiredLabel>
                  <select
                    id="guests"
                    name="guests"
                    required
                    className={selectClassName}
                    value={form.guests}
                    onChange={(e) => handleChange("guests", e.target.value)}
                  >
                    {GUEST_OPTIONS.map((count) => (
                      <option key={count} value={count}>
                        {count}{" "}
                        {count === "1"
                          ? t("reservation.guestSingular")
                          : t("reservation.guestPlural")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <p className="border-t border-border-subtle pt-5 text-xs leading-relaxed text-foreground-muted/90 sm:text-sm">
                {t("reservation.cancellationPolicy")}
              </p>

              <Button type="submit" size="lg" className="w-full">
                {t("reservation.submit")}
              </Button>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.2 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
            <a href={`tel:${BUSINESS.phoneTel}`}>
              <Phone size={18} aria-hidden />
              {t("reservation.callDirect")}
            </a>
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
            <Link
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} aria-hidden />
              {t("reservation.whatsapp")}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
