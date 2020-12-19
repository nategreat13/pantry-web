export type ClientId = string;

export interface ClientHouseholdInfo {
  numAdults: number;
  numkids: number;
  numSeniors: number;
  numMales: number;
  numFemales: number;
  numWhites: number;
  numBlack: number;
  numHispanic: number;
  numAsian: number;
  numOther: number;
}

export interface Client {
  clientId: ClientId;
  registrationDate: number;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phoneNumber?: string;
  householdInfo: ClientHouseholdInfo;
}
