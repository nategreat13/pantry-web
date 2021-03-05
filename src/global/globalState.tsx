import { createContext, ReactNode, useContext } from "react";
import { Pantry } from "../models/pantry.schema";
import {
  ImmutableStateSetter,
  useImmutableState,
} from "../utils/useImmutableState";

export interface GlobalState {
  user?: {
    pantry: Pantry;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
  };
}

export const GlobalContext = createContext<
  [GlobalState, ImmutableStateSetter<GlobalState>] | null
>(null);

export function useGlobalContext() {
  const val = useContext(GlobalContext);

  if (!val) {
    throw new Error("Must supply provider!");
  }

  return val;
}

export function GlobalContextProvider(p: { children?: ReactNode }) {
  const [globalState, setGlobalState] = useImmutableState<GlobalState>({});

  return (
    <GlobalContext.Provider value={[globalState, setGlobalState]}>
      {p.children}
    </GlobalContext.Provider>
  );
}
