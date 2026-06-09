import de from "@/i18n/de.json";
import en from "@/i18n/en.json";
import tr from "@/i18n/tr.json";
import type { UILocale } from "@/types/menu";
import type { TranslationDictionary } from "@/i18n/types";

const dictionaries: Record<UILocale, TranslationDictionary> = { de, en, tr };

export function getDictionary(locale: UILocale): TranslationDictionary {
  return dictionaries[locale] ?? dictionaries.de;
}

export function translate(
  locale: UILocale,
  key: string
): string {
  const keys = key.split(".");
  let value: unknown = getDictionary(locale);

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  return typeof value === "string" ? value : key;
}

export const LOCALES: { code: UILocale; label: string }[] = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
];

export const DEFAULT_LOCALE: UILocale = "de";
