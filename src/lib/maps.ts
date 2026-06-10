export const NAVIGATION_ADDRESS = "Untermauerstraße 4, 47051 Duisburg";

export type MapProvider = "apple" | "google";

export function getAppleMapsUrl(
  address: string = NAVIGATION_ADDRESS
): string {
  return `https://maps.apple.com/?q=${encodeURIComponent(address)}`;
}

export function getGoogleMapsUrl(
  address: string = NAVIGATION_ADDRESS
): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
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
  address: string = NAVIGATION_ADDRESS
): string {
  return detectPreferredMapProvider(userAgent) === "apple"
    ? getAppleMapsUrl(address)
    : getGoogleMapsUrl(address);
}

export function getMapProviderLabel(provider: MapProvider): string {
  return provider === "apple" ? "Apple Karten" : "Google Maps";
}
