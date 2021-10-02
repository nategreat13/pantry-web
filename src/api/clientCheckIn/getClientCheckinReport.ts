import _ from "lodash";
import moment from "moment";
import { Client } from "../../models/client.schema";
import { ClientCheckin } from "../../models/clientCheckin.schema";
import { getPantryFirestore } from "../../services/firebase.service";

export async function getClientCheckinReport(p: {
  pantryId: string;
  startDateMS: number;
  endDateMS: number;
}) {
  let clientCheckins: ClientCheckin[] = [];
  let clientCheckinsAndClients: {
    clientCheckIn: ClientCheckin;
    client: Client;
  }[] = [];
  const r = await getPantryFirestore().ClientCheckin.query({
    where: [
      { pantryId: ["==", p.pantryId] },
      { checkinDate: [">", p.startDateMS] },
      { checkinDate: ["<", p.endDateMS] },
    ],
    limit: 400,
  });

  clientCheckins = _.concat(clientCheckins, r.docs);
  let nextQuery = r.nextQuery;

  while (nextQuery) {
    const r2 = await getPantryFirestore().ClientCheckin.query(nextQuery);

    clientCheckins = _.concat(clientCheckins, r2.docs);
    nextQuery = r2.nextQuery;
  }

  const uniqueClientsIds = _.uniq(clientCheckins.map((ccin) => ccin.clientId));

  const clients = await getPantryFirestore().Client.getDocs(uniqueClientsIds);

  const clientsMap = clients.reduce((acc, val) => {
    if (val) {
      acc[val.id] = val;
    }
    return acc;
  }, {} as Record<string, Client>);

  const sortedCheckIns = _.orderBy(clientCheckins, "checkinDate", "desc");
  for (let i = 0; i < sortedCheckIns.length; i++) {
    const clientCheckIn = sortedCheckIns[i];
    const client = clientsMap[clientCheckIn.clientId];
    if (clientCheckIn && client) {
      clientCheckinsAndClients.push({
        client,
        clientCheckIn,
      });
    }
  }

  return clientCheckinsAndClients;
}
