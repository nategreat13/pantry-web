import { Pantry } from "../../models/pantry.schema";
import { getPantryFirestore } from "../../services/firebase.service";
import { addCheckin } from "./addCheckIn";

export async function checkInClient(p: {
  clientId: string;
  pantry: Pantry;
  volunteerName: string;
  volunteerEmail: string;
}) {
  try {
    const client = await getPantryFirestore().Client.getDoc(p.clientId);

    if (!client) {
      return null;
    }

    const checkin = await addCheckin({
      clientCheckIn: {
        clientId: p.clientId,
        pantryId: p.pantry.id,
        volunteerName: p.volunteerName,
        volunteerEmail: p.volunteerEmail,
      },
    });

    if (!client.registeredPantries?.[p.pantry.id]) {
      await getPantryFirestore().Client.update({
        id: client.id,
        doc: { registeredPantries: { [p.pantry.id]: true } },
      });
    }

    return { checkin, client };
  } catch (e) {
    console.log(e);
    return null;
  }
}
