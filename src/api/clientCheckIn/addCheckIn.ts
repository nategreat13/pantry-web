import { ClientCheckin } from "../../models/clientCheckin.schema";
import { getFirestoreHelper } from "../../services/firebase.service";

export async function addCheckin(p: {
  clientCheckIn: Omit<ClientCheckin, "id" | "checkinDate">;
}) {
  const id = getFirestoreHelper().ClientCheckIn.generateId();
  const clientCheckInToAdd: ClientCheckin = {
    ...p.clientCheckIn,
    ...{ checkinDate: Date.now(), id },
  };

  await getFirestoreHelper().ClientCheckIn.add({ item: clientCheckInToAdd });

  return clientCheckInToAdd;
}
