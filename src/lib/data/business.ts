export const BUSINESS = {
  name: "La Savi Steakhouse",
  legalName: "La Savi GmbH",
  street: "Untermauerstraße 4",
  city: "Duisburg",
  postalCode: "47051",
  country: "Deutschland",
  phone: "0163-458 898 8",
  phoneTel: "01634588988",
  whatsapp: "https://wa.me/491634588988",
  email: "kontakt@lasavi.de",
  website: "https://www.lasavi.de",
  managingDirector: "[Name des Geschäftsführers]",
  registerCourt: "Amtsgericht Duisburg",
  registerNumber: "HRB XXXXX",
  taxId: "DE363944685",
  tagline: "Dunkel, modern — gemacht für Gäste mit Geschmack.",
  openingHours: {
    weekdays: "Montag - Samstag: 12:00 - 22:00 Uhr",
    sunday: "Sonntag: Geschlossen",
  },
  halalCertified: true,
} as const;

export const BUSINESS_ADDRESS = `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`;
