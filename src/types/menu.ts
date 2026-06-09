/** UI languages available in the language switcher */
export type UILocale = "de" | "en" | "tr";

/** All menu content languages (current + future phases) */
export type MenuLocale =
  | "de"
  | "en"
  | "tr"
  | "fr"
  | "nl"
  | "pl"
  | "ar"
  | "uk"
  | "es"
  | "it";

/** @deprecated Use UILocale for UI context */
export type Locale = UILocale;

export type LocalizedString = Record<MenuLocale, string>;

export interface MenuCategory {
  id: string;
  name: LocalizedString;
}

export interface MenuItem {
  id: string;
  number: string;
  category: string;
  price: number;
  currency: "EUR";
  name: LocalizedString;
  description: LocalizedString;
  tags: string[];
  allergens: string[];
  image: string;
}

export interface MenuData {
  categories: MenuCategory[];
  items: MenuItem[];
}

export function resolveLocalized(
  obj: LocalizedString,
  locale: UILocale
): string {
  const preferred = obj[locale]?.trim();
  if (preferred) return preferred;

  const german = obj.de?.trim();
  if (german) return german;

  const english = obj.en?.trim();
  if (english) return english;

  return Object.values(obj).find((value) => value.trim().length > 0) ?? "";
}
