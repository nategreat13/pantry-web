import { getPantryFirestore } from "../../services/firebase.service";

export async function getPantry(p: { id: string }) {
  const pantry = await getPantryFirestore().Pantry.getDoc(p.id);

  return pantry;
}
