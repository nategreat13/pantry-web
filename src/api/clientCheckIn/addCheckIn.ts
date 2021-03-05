import { ClientCheckin } from "../../models/clientCheckin.schema";
import { getPantryFirestore } from "../../services/firebase.service";

export async function addCheckin(p: {
  clientCheckIn: Omit<ClientCheckin, "id" | "checkinDate">;
}) {
  const id = getPantryFirestore().ClientCheckin.generateId();
  const clientCheckInToAdd: ClientCheckin = {
    ...p.clientCheckIn,
    ...{ checkinDate: Date.now(), id },
  };

  await getPantryFirestore().ClientCheckin.add({ doc: clientCheckInToAdd });

  return clientCheckInToAdd;
}
