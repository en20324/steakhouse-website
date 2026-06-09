import { BUSINESS } from "@/lib/data";

/**
 * JSON-LD Structured Data for La Savi Steakhouse.
 * @see https://schema.org/Restaurant
 */
export const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://www.lasavi.de/#restaurant",
  name: BUSINESS.name,
  description:
    "100 % Halal-zertifiziertes Steakhouse in Duisburg. Premium Steaks, Grill-Spezialitäten, Döner, Lammgerichte und Halal Dishes.",
  url: BUSINESS.website,
  image: "https://www.lasavi.de/og-image.jpg",
  telephone: "+49-163-4588988",
  email: BUSINESS.email,
  priceRange: "€€€",
  servesCuisine: ["Steakhouse", "Grill", "Döner", "Lammgerichte", "Halal"],
  acceptsReservations: true,
  suitableForDiet: "https://schema.org/HalalDiet",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "12:00",
      closes: "22:00",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.city,
    postalCode: BUSINESS.postalCode,
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.coordinates.lat,
    longitude: BUSINESS.coordinates.lng,
  },
  sameAs: [BUSINESS.website, BUSINESS.instagram],
} as const;
