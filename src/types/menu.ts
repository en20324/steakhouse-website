export type Locale = "de" | "en" | "tr";

export type LocalizedString = Record<Locale, string>;

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
