import businessJson from "@/data/business.json";
import menuJson from "@/data/menu.json";
import type { BusinessData } from "@/types/business";
import type { MenuData } from "@/types/menu";

export const BUSINESS = businessJson as BusinessData;

export const BUSINESS_ADDRESS = `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`;

export const GOOGLE_MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}, ${BUSINESS.country}`
)}`;

export const MENU_DATA = menuJson as MenuData;

export const MENU_QR_URL = `${BUSINESS.siteUrl.replace(/\/$/, "")}/menu`;

export function getMenuQrDisplayUrl(): string {
  try {
    const { host } = new URL(BUSINESS.siteUrl);
    return `${host}/menu`;
  } catch {
    return "lasavi.de/menu";
  }
}

export function formatPrice(price: number, currency: "EUR" = "EUR"): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
  }).format(price);
}
