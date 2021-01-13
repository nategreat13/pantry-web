export interface ClientHouseholdInfo {
  numAdults: number;
  numKids: number;
  numSeniors: number;
  numMales: number;
  numFemales: number;
  numOtherGender: number;
  numWhites: number;
  numBlack: number;
  numHispanic: number;
  numAsian: number;
  numOtherEthnicity: number;
}

export interface Client {
  id: string;
  registrationDate: number;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber?: string;
  householdInfo: ClientHouseholdInfo;
}
