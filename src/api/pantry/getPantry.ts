import { getFirestoreHelper } from "../../services/firebase.service";

export async function getPantry(p: { id: string }) {
  const pantry = await getFirestoreHelper().Pantry.getDoc(p.id);

  return pantry;
}
