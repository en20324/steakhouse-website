export type MenuCategoryId =
  | "highlights"
  | "salate"
  | "grill-steaks"
  | "nachtisch";

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
}

export interface MenuItem {
  id: string;
  number: string;
  title: string;
  descriptionDe: string;
  descriptionEn: string;
  price: string;
  categories: MenuCategoryId[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: "highlights", label: "Highlights" },
  { id: "salate", label: "Salate" },
  { id: "grill-steaks", label: "Grill & Steaks" },
  { id: "nachtisch", label: "Nachtisch" },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "02",
    number: "02.",
    title: "Hirtensalat-Feta Käse",
    descriptionDe:
      "Mit Granatapfeldressing oder Kräuterdressing — frisch und aromatisch.",
    descriptionEn: "Shepherd's Salad with Feta cheese.",
    price: "7,90 €",
    categories: ["highlights", "salate"],
  },
  {
    id: "05",
    number: "05.",
    title: "Kräuter Blätter Salat-Büffelmozzarella",
    descriptionDe:
      "Frische Kräuterblätter mit cremigem Büffelmozzarella und feinem Dressing.",
    descriptionEn: "Herb leaves salad with buffalo mozzarella.",
    price: "11,90 €",
    categories: ["highlights", "salate"],
  },
  {
    id: "22",
    number: "22.",
    title: "Gemischter Grill Teller Mixed",
    descriptionDe:
      "Auswahl unserer besten Grill-Spezialitäten — vom offenen Feuer, halal zubereitet.",
    descriptionEn: "Mixed grill plate.",
    price: "23,90 €",
    categories: ["highlights", "grill-steaks"],
  },
  {
    id: "34",
    number: "34.",
    title: "Filet Steak ca. 300 gr",
    descriptionDe:
      "Zartes Rinderfilet vom Grill, butterweich und auf den Punkt gegart.",
    descriptionEn: "Tender beef fillet steak, approx. 300 g.",
    price: "39,90 €",
    categories: ["highlights", "grill-steaks"],
  },
  {
    id: "39",
    number: "39.",
    title: "Wagyu Filet ca. 200 gr",
    descriptionDe:
      "Exklusives Wagyu-Filet von höchster Marmorierung — ein außergewöhnliches Geschmackserlebnis.",
    descriptionEn: "Exclusive Wagyu fillet, approx. 200 g.",
    price: "129,00 €",
    categories: ["highlights", "grill-steaks"],
  },
  {
    id: "42",
    number: "42.",
    title: "Katmer",
    descriptionDe: "Gefalteter Teig mit Sahne und Pistazien, warm serviert.",
    descriptionEn: "Folded pastry with cream and pistachios.",
    price: "7,90 €",
    categories: ["highlights", "nachtisch"],
  },
  {
    id: "43",
    number: "43.",
    title: "Künefe",
    descriptionDe: "Fadenteig mit Käse, goldbraun gebacken und mit Sirup verfeinert.",
    descriptionEn: "Shredded phyllo pastry with cheese.",
    price: "7,90 €",
    categories: ["highlights", "nachtisch"],
  },
];

export function getMenuItemsByCategory(categoryId: MenuCategoryId): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.categories.includes(categoryId));
}
