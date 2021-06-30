import _ from "lodash";
import moment from "moment";
import { Client } from "../../models/client.schema";
import { getPantryFirestore } from "../../services/firebase.service";

export async function getAllPantryClients(p: { pantryId: string }) {
  let clients: Client[] = [];
  const r = await getPantryFirestore().Client.query({
    where: [{ registeredPantries: { [p.pantryId]: ["==", true] } }],
    limit: 400,
  });

  clients = _.concat(clients, r.docs);
  let nextQuery = r.nextQuery;

  while (nextQuery) {
    const r2 = await getPantryFirestore().Client.query(nextQuery);

    clients = _.concat(clients, r2.docs);
    nextQuery = r2.nextQuery;
  }

  return clients;
}
