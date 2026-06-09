"use client";

import type { ReactNode } from "react";
import { BUSINESS } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageProvider";

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-6">
      <h3 className="font-serif text-lg text-accent-gold-light">{title}</h3>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-foreground-muted">
        {children}
      </div>
    </div>
  );
}

function ImpressumContent() {
  return (
    <div className="text-sm leading-relaxed text-foreground-muted">
      <LegalSection title="Angaben gemäß § 5 TMG">
        <p>{BUSINESS.legalName}</p>
        <p>{BUSINESS.street}</p>
        <p>
          {BUSINESS.postalCode} {BUSINESS.city}
        </p>
        <p>{BUSINESS.country}</p>
      </LegalSection>

      <LegalSection title="Kontakt">
        <p>
          Telefon:{" "}
          <a
            href={`tel:${BUSINESS.phoneTel}`}
            className="text-accent-gold hover:underline"
          >
            {BUSINESS.phone}
          </a>
        </p>
        <p>
          E-Mail:{" "}
          <a
            href={`mailto:${BUSINESS.email}`}
            className="text-accent-gold hover:underline"
          >
            {BUSINESS.email}
          </a>
        </p>
        <p>
          Web:{" "}
          <a
            href={BUSINESS.website}
            className="text-accent-gold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {BUSINESS.website}
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Vertreten durch">
        <p>Geschäftsführer: {BUSINESS.managingDirector}</p>
      </LegalSection>

      <LegalSection title="Registereintrag">
        <p>
          Registergericht: {BUSINESS.registerCourt}
          <br />
          Registernummer: {BUSINESS.registerNumber}
        </p>
      </LegalSection>

      <LegalSection title="Umsatzsteuer-ID">
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:{" "}
          {BUSINESS.taxId}
        </p>
      </LegalSection>

      <LegalSection title="Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV">
        <p>{BUSINESS.managingDirector}</p>
        <p>{BUSINESS.street}</p>
        <p>
          {BUSINESS.postalCode} {BUSINESS.city}
        </p>
      </LegalSection>

      <LegalSection title="EU-Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            className="text-accent-gold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
      </LegalSection>

      <LegalSection title="Verbraucherstreitbeilegung / Universalschlichtungsstelle">
        <p>
          Wir sind nicht bereit oder verpflichtet, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </LegalSection>
    </div>
  );
}

function DatenschutzContent() {
  return (
    <div className="text-sm leading-relaxed text-foreground-muted">
      <LegalSection title="1. Verantwortlicher">
        <p>
          Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
        </p>
        <p className="mt-2">
          {BUSINESS.legalName}
          <br />
          {BUSINESS.street}
          <br />
          {BUSINESS.postalCode} {BUSINESS.city}
          <br />
          E-Mail: {BUSINESS.email}
          <br />
          Telefon: {BUSINESS.phone}
        </p>
      </LegalSection>

      <LegalSection title="2. Allgemeine Hinweise zur Datenverarbeitung">
        <p>
          Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen.
          Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der
          gesetzlichen Bestimmungen (DSGVO, BDSG, TMG).
        </p>
      </LegalSection>

      <LegalSection title="3. Erhebung und Speicherung personenbezogener Daten">
        <p>
          Beim Besuch unserer Website werden automatisch Informationen
          allgemeiner Natur erfasst. Wenn Sie unser Reservierungsformular nutzen,
          erheben wir die von Ihnen angegebenen Daten ausschließlich zur
          Bearbeitung Ihrer Tischreservierung.
        </p>
      </LegalSection>

      <LegalSection title="4. Zweck und Rechtsgrundlage">
        <p>
          Die Verarbeitung erfolgt zur Durchführung vorvertraglicher Maßnahmen
          und zur Erfüllung vertraglicher Pflichten (Art. 6 Abs. 1 lit. b
          DSGVO).
        </p>
      </LegalSection>

      <LegalSection title="5. Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch.
          Kontakt: {BUSINESS.email}
        </p>
      </LegalSection>

      <LegalSection title="6. Google Maps">
        <p>
          Google Maps wird erst nach Ihrer ausdrücklichen Zustimmung geladen.
          Dabei können Daten an Google LLC übermittelt werden.
        </p>
      </LegalSection>
    </div>
  );
}

interface LegalModalsProps {
  triggerClassName?: string;
}

export function ImpressumModal({ triggerClassName }: LegalModalsProps) {
  const { t } = useLanguage();

  return (
    <Dialog>
      <DialogTrigger
        className={
          triggerClassName ??
          "text-xs tracking-wide text-foreground-muted transition-colors hover:text-accent-gold"
        }
      >
        {t("footer.impressum")}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("footer.impressum")}</DialogTitle>
          <DialogDescription>
            Angaben gemäß § 5 TMG für {BUSINESS.legalName}
          </DialogDescription>
        </DialogHeader>
        <ImpressumContent />
      </DialogContent>
    </Dialog>
  );
}

export function DatenschutzModal({ triggerClassName }: LegalModalsProps) {
  const { t } = useLanguage();

  return (
    <Dialog>
      <DialogTrigger
        className={
          triggerClassName ??
          "text-xs tracking-wide text-foreground-muted transition-colors hover:text-accent-gold"
        }
      >
        {t("footer.privacy")}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("footer.privacy")}</DialogTitle>
          <DialogDescription>
            Informationen zur Verarbeitung personenbezogener Daten
          </DialogDescription>
        </DialogHeader>
        <DatenschutzContent />
      </DialogContent>
    </Dialog>
  );
}
