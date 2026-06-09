/**
 * JSON-LD Structured Data for The Prime Cut Steakhouse.
 * Update placeholder values before going live.
 * @see https://schema.org/Restaurant
 */
export const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://www.theprimecutsteakhouse.com/#restaurant",
  name: "The Prime Cut Steakhouse",
  description:
    "Premium steakhouse offering artisan dry-aged cuts, fine dining, and an unforgettable culinary experience.",
  url: "https://www.theprimecutsteakhouse.com",
  image: "https://www.theprimecutsteakhouse.com/og-image.jpg",
  telephone: "+1-000-000-0000",
  email: "reservations@theprimecutsteakhouse.com",
  priceRange: "$$$$",
  servesCuisine: ["Steakhouse", "Fine Dining"],
  acceptsReservations: true,
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
        "Sunday",
      ],
      opens: "17:00",
      closes: "23:00",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Prime Cut Boulevard",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10001",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.7128,
    longitude: -74.006,
  },
  sameAs: [
    "https://www.instagram.com/theprimecutsteakhouse",
    "https://www.facebook.com/theprimecutsteakhouse",
  ],
} as const;
