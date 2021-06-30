export interface ClientHouseholdInfo {
  numAdults: number;
  numKids: number;
  numSeniors: number;
  numMales: number;
  numFemales: number;
  numOtherGender: number;
  numWhite: number;
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
  address: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  phoneNumber?: string;
  householdInfo: ClientHouseholdInfo;
  registeredPantries?: Record<string, true>;
}

const ClientForKeys: Required<Client> = {
  address: "",
  address2: "",
  city: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  zip: "",
  id: "",
  registrationDate: 0,
  registeredPantries: {},
  householdInfo: {
    numAdults: 0,
    numKids: 0,
    numSeniors: 0,
    numMales: 0,
    numFemales: 0,
    numOtherGender: 0,
    numWhite: 0,
    numBlack: 0,
    numHispanic: 0,
    numAsian: 0,
    numOtherEthnicity: 0,
  },
};

let keys = Object.keys(ClientForKeys);

keys = [
  ...keys.slice(0, keys.indexOf("householdInfo")),
  ...keys.slice(keys.indexOf("householdInfo"), keys.length - 1),
];
keys = [...keys, ...Object.keys(ClientForKeys.householdInfo)];

export const ClientKeys = keys;
