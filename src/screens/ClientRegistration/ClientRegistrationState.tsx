import { createContext, ReactNode, useContext } from "react";
import { Client } from "../../models/client.schema";
import {
  ImmutableStateSetter,
  useImmutableState,
} from "../../utils/useImmutableState";

export const ClientRegistrationContext = createContext<
  [Client, ImmutableStateSetter<Client>] | null
>(null);

export function useClientRegistrationContext() {
  const val = useContext(ClientRegistrationContext);

  if (!val) {
    throw new Error("Must supply provider!");
  }

  return val;
}

export function ClientRegistrationProvider(p: { children?: ReactNode }) {
  const [
    clientRegistrationState,
    setClientRegistrationState,
  ] = useImmutableState<Client>({
    id: "",
    registrationDate: 0,
    address: "",
    address2: "",
    city: "",
    firstName: "",
    lastName: "",
    state: "",
    zip: "",
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
  });

  return (
    <ClientRegistrationContext.Provider
      value={[clientRegistrationState, setClientRegistrationState]}
    >
      {p.children}
    </ClientRegistrationContext.Provider>
  );
}
