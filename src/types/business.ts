export interface BusinessData {
  name: string;
  legalName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  phoneTel: string;
  whatsapp: string;
  email: string;
  website: string;
  instagram: string;
  managingDirector: string;
  registerCourt: string;
  registerNumber: string;
  taxId: string;
  tagline: string;
  openingHours: {
    weekdays: string;
    sunday: string;
  };
  halalCertified: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}
