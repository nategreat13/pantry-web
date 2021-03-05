import { getPantryFirestore } from "../../services/firebase.service";

export async function getClient(p: { id: string }) {
  return getPantryFirestore().Client.getDoc(p.id);
}
