import { Pantry } from "../../models/pantry.schema";
import { getPantryFirestore } from "../../services/firebase.service";
import { getNewPantryId } from "./getNewPantryId";

export async function registerPantry(p: {
  pantry: Omit<Pantry, "id" | "registrationDate" | "terms">;
}) {
  const id = await getNewPantryId();
  const pantryToAdd: Pantry = {
    ...p.pantry,
    ...{
      registrationDate: Date.now(),
      id: `${id}`,
      terms: p.pantry.name
        .split(" ")
        .filter((t) => t !== " " && t !== "")
        .reduce((arr, t) => {
          arr[t.toLowerCase()] = true;
          return arr;
        }, {} as Record<string, true>),
    },
  };

  await getPantryFirestore().Pantry.add({ doc: pantryToAdd });

  return id;
}
