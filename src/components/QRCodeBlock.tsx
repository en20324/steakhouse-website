"use client";

import QRCode from "react-qr-code";
import { MENU_QR_URL, getMenuQrDisplayUrl } from "@/lib/data";
import { useLanguage } from "@/context/LanguageProvider";

export default function QRCodeBlock() {
  const { t } = useLanguage();

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] sm:p-8">
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
        <div className="rounded-xl border border-border-subtle bg-white p-4 shadow-[0_0_24px_rgba(212,175,55,0.12)]">
          <QRCode
            value={MENU_QR_URL}
            size={128}
            level="M"
            bgColor="#ffffff"
            fgColor="#1a1408"
            aria-label={t("qr.title")}
          />
        </div>
        <div className="mt-6 sm:mt-0">
          <h3 className="font-serif text-2xl tracking-wide text-foreground">
            {t("qr.title")}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            {t("qr.subtitle")}
          </p>
          <p className="mt-3 font-medium tracking-wide text-[#D4AF37]">
            {getMenuQrDisplayUrl()}
          </p>
        </div>
      </div>
    </div>
  );
}
