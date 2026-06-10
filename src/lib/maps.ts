import { BUSINESS, BUSINESS_ADDRESS } from "@/lib/data";

export const NAVIGATION_PLACE_NAME = BUSINESS.name;
export const NAVIGATION_ADDRESS = BUSINESS_ADDRESS;
export const NAVIGATION_QUERY = `${NAVIGATION_PLACE_NAME}, ${NAVIGATION_ADDRESS}`;

export type MapProvider = "apple" | "google";

export function getAppleMapsUrl(query: string = NAVIGATION_QUERY): string {
  return `https://maps.apple.com/?q=${encodeURIComponent(query)}`;
}

export function getGoogleMapsUrl(query: string = NAVIGATION_QUERY): string {
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

export function getPreferredMapUrl(
  userAgent: string,
  query: string = NAVIGATION_QUERY
): string {
  return detectPreferredMapProvider(userAgent) === "apple"
    ? getAppleMapsUrl(query)
    : getGoogleMapsUrl(query);
}

export function getMapProviderLabel(provider: MapProvider): string {
  return provider === "apple" ? "Apple Karten" : "Google Maps";
}
