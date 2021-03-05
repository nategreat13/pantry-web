import { Pantry } from "../../models/pantry.schema";
import { getPantryFirestore } from "../../services/firebase.service";
import { addCheckin } from "./addCheckIn";

export async function checkInClient(p: { clientId: string; pantry: Pantry }) {
  try {
    const client = await getPantryFirestore().Client.getDoc(p.clientId);

    if (!client) {
      return null;
    }

    const checkin = await addCheckin({
      clientCheckIn: {
        clientId: p.clientId,
        pantryId: p.pantry.id,
      },
    });

    return { checkin, client };
  } catch (e) {
    console.log(e);
    return null;
  }
}
