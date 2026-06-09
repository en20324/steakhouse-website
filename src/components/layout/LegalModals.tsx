"use client";

import type { ReactNode } from "react";
import { BUSINESS } from "@/lib/data/business";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
          allgemeiner Natur erfasst (z. B. Browsertyp, Betriebssystem,
          Referrer-URL, Uhrzeit des Zugriffs). Diese Daten lassen keinen
          unmittelbaren Rückschluss auf Ihre Person zu.
        </p>
        <p>
          Wenn Sie unser Reservierungsformular nutzen, erheben wir die von Ihnen
          angegebenen Daten (Name, E-Mail, Telefonnummer, Datum, Uhrzeit,
          Personenzahl) ausschließlich zur Bearbeitung Ihrer Tischreservierung.
        </p>
      </LegalSection>

      <LegalSection title="4. Zweck und Rechtsgrundlage">
        <p>
          Die Verarbeitung erfolgt zur Durchführung vorvertraglicher Maßnahmen
          und zur Erfüllung vertraglicher Pflichten (Art. 6 Abs. 1 lit. b
          DSGVO) sowie auf Grundlage unseres berechtigten Interesses an einer
          funktionsfähigen Website (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </LegalSection>

      <LegalSection title="5. Weitergabe von Daten">
        <p>
          Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als
          den im Folgenden genannten Zwecken findet nicht statt. Wir geben Ihre
          persönlichen Daten nur weiter, wenn dies gesetzlich vorgeschrieben ist
          oder Sie eingewilligt haben.
        </p>
      </LegalSection>

      <LegalSection title="6. Speicherdauer">
        <p>
          Wir speichern personenbezogene Daten nur so lange, wie dies für die
          Erfüllung der jeweiligen Zwecke erforderlich ist oder gesetzliche
          Aufbewahrungsfristen bestehen.
        </p>
      </LegalSection>

      <LegalSection title="7. Ihre Rechte">
        <p>Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
          <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
          <li>Recht auf Löschung (Art. 17 DSGVO)</li>
          <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
        </ul>
        <p className="mt-2">
          Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: {BUSINESS.email}
        </p>
      </LegalSection>

      <LegalSection title="8. Beschwerderecht">
        <p>
          Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über
          die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
        </p>
      </LegalSection>

      <LegalSection title="9. SSL-/TLS-Verschlüsselung">
        <p>
          Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw.
          TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran,
          dass die Adresszeile des Browsers von „http://“ auf „https://“
          wechselt.
        </p>
      </LegalSection>

      <LegalSection title="10. Aktualität und Änderung">
        <p>
          Diese Datenschutzerklärung ist aktuell gültig. Durch die Weiterentwicklung
          unserer Website oder aufgrund geänderter gesetzlicher bzw.
          behördlicher Vorgaben kann eine Anpassung erforderlich werden.
        </p>
      </LegalSection>
    </div>
  );
}

interface LegalModalsProps {
  triggerClassName?: string;
}

export function ImpressumModal({ triggerClassName }: LegalModalsProps) {
  return (
    <Dialog>
      <DialogTrigger
        className={
          triggerClassName ??
          "text-xs tracking-wide text-foreground-muted transition-colors hover:text-accent-gold"
        }
      >
        Impressum
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Impressum</DialogTitle>
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
  return (
    <Dialog>
      <DialogTrigger
        className={
          triggerClassName ??
          "text-xs tracking-wide text-foreground-muted transition-colors hover:text-accent-gold"
        }
      >
        Datenschutz
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Datenschutzerklärung</DialogTitle>
          <DialogDescription>
            Informationen zur Verarbeitung personenbezogener Daten
          </DialogDescription>
        </DialogHeader>
        <DatenschutzContent />
      </DialogContent>
    </Dialog>
  );
}
