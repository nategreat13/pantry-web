import { Client } from "../../models/client.schema";
import { getFirestoreHelper } from "../../services/firebase.service";
import { getNewClientId } from "./getNewClientId";

export async function registerClient(p: {
  client: Omit<Client, "id" | "registrationDate">;
}) {
  const id = await getNewClientId();
  const clientToAdd: Client = {
    ...p.client,
    ...{ registrationDate: Date.now(), id: `${id}` },
  };

  await getFirestoreHelper().Client.add({ item: clientToAdd });

  return id;
}
