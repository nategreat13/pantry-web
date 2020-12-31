import { Pantry } from "../../models/pantry.schema";
import { getFirestoreHelper } from "../../services/firebase.service";
import { getNewPantryId } from "./getNewPantryId";

export async function registerPantry(p: {
  pantry: Omit<Pantry, "id" | "registrationDate">;
}) {
  const id = await getNewPantryId();
  const pantryToAdd: Pantry = {
    ...p.pantry,
    ...{ registrationDate: Date.now(), id: `${id}` },
  };

  await getFirestoreHelper().Pantry.add({ item: pantryToAdd });

  return id;
}
