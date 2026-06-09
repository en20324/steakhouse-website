/**
 * JSON-LD Structured Data for La Savi Steakhouse.
 * @see https://schema.org/Restaurant
 */
export const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://www.lasavi.de/#restaurant",
  name: "La Savi Steakhouse",
  description:
    "100 % Halal-zertifiziertes Steakhouse in Duisburg. Premium Steaks, Grill-Spezialitäten, Döner, Lammgerichte und Halal Dishes — mit höchstem Anspruch an Qualität.",
  url: "https://www.lasavi.de",
  image: "https://www.lasavi.de/og-image.jpg",
  email: "kontakt@lasavi.de",
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
    streetAddress: "Untermauerstraße 4",
    addressLocality: "Duisburg",
    postalCode: "47051",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.4328,
    longitude: 6.7642,
  },
  sameAs: ["https://www.lasavi.de"],
} as const;
