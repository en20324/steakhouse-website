import { BUSINESS, BUSINESS_ADDRESS } from "@/lib/data";

export const NAVIGATION_PLACE_NAME = BUSINESS.name;
export const NAVIGATION_ADDRESS = BUSINESS_ADDRESS;
export const NAVIGATION_QUERY = `${NAVIGATION_PLACE_NAME}, ${NAVIGATION_ADDRESS}`;

/** Google Maps search tuned to open the La Savi business profile card. */
export const GOOGLE_MAPS_SEARCH_QUERY =
  "La Savi Duisburg Untermauerstrasse 4";

/** Apple Maps business name + address parameters for place lookup. */
export const APPLE_MAPS_SEARCH_NAME = "La Savi Steakhouse Duisburg";
export const APPLE_MAPS_ADDRESS_PARAM = `Untermauerstrasse 4,${BUSINESS.postalCode} ${BUSINESS.city}`;

export type MapProvider = "apple" | "google";

export function getAppleMapsUrl(
  searchName: string = APPLE_MAPS_SEARCH_NAME,
  address: string = APPLE_MAPS_ADDRESS_PARAM
): string {
  return `https://maps.apple.com/?q=${encodeURIComponent(searchName)}&address=${encodeURIComponent(address)}`;
}

export function getGoogleMapsUrl(
  query: string = GOOGLE_MAPS_SEARCH_QUERY
): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * Detects the preferred map provider from a User-Agent string.
 * iPhone, iPad, iPod → Apple Maps.
 * Mac + Safari (not Chrome/Edge/Firefox) → Apple Maps.
 * Android → Google Maps.
 * Everything else → Google Maps.
 */
export function detectPreferredMapProvider(userAgent: string): MapProvider {
  const ua = userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) {
    return "apple";
  }

  const isMac = /macintosh|mac os x/.test(ua);
  const isSafari =
    /safari/.test(ua) &&
    !/chrome|chromium|crios|fxios|edgios|edg|opr|opera/.test(ua);

  if (isMac && isSafari) {
    return "apple";
  }

  if (/android/.test(ua)) {
    return "google";
  }

  return "google";
}

export function getPreferredMapUrl(userAgent: string): string {
  return detectPreferredMapProvider(userAgent) === "apple"
    ? getAppleMapsUrl()
    : getGoogleMapsUrl();
}

export function getMapProviderLabel(provider: MapProvider): string {
  return provider === "apple" ? "Apple Karten" : "Google Maps";
}
