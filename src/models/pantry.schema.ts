export interface Pantry {
  id: string;
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber?: string;
  registrationDate: number;
  password: string;
  adminPassword: string;
  terms: Record<string, true>;
}
