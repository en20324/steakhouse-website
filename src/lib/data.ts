import businessJson from "@/data/business.json";
import menuJson from "@/data/menu.json";
import type { BusinessData } from "@/types/business";
import type { MenuData } from "@/types/menu";

export const BUSINESS = businessJson as BusinessData;

export const BUSINESS_ADDRESS = `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`;

export const MENU_DATA = menuJson as MenuData;

export function formatPrice(price: number, currency: "EUR" = "EUR"): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
  }).format(price);
}
