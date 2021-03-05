import { Client } from "../../models/client.schema";
import { getPantryFirestore } from "../../services/firebase.service";
import { getNewClientId } from "./getNewClientId";
import _ from "lodash";

export async function registerClient(p: {
  client: Omit<Client, "id" | "registrationDate">;
}) {
  try {
    const id = await getNewClientId();
    const clientToAdd: Client = {
      ...p.client,
      ...{
        registrationDate: Date.now(),
        id: `${id}`,
        firstName: _.capitalize(p.client.firstName),
        lastName: _.capitalize(p.client.lastName),
      },
    };

    await getPantryFirestore().Client.add({ doc: clientToAdd });

    return clientToAdd;
  } catch (e) {
    return undefined;
  }
}
