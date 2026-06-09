export const BUSINESS = {
  name: "La Savi Steakhouse",
  legalName: "La Savi GmbH",
  street: "Untermauerstraße 4",
  city: "Duisburg",
  postalCode: "47051",
  country: "Deutschland",
  phone: "0203 39689883",
  phoneTel: "+4920339689883",
  whatsapp: "https://wa.me/4920339689883",
  email: "kontakt@lasavi.de",
  website: "https://www.lasavi.de",
  managingDirector: "[Name des Geschäftsführers]",
  registerCourt: "Amtsgericht Duisburg",
  registerNumber: "HRB XXXXX",
  taxId: "DE363944685",
  openingHours: {
    weekdays: "Montag – Samstag: 12:00 – 22:00 Uhr",
    sunday: "Sonntag: geschlossen",
  },
  halalCertified: true,
} as const;

export const BUSINESS_ADDRESS = `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`;
