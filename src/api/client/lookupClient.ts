import { OptionalQuery } from "firestore-lift/dist/src/models";
import { Client } from "../../models/client.schema";
import { getFirestoreHelper } from "../../services/firebase.service";

export async function lookupClient(p: {
  firstName?: string;
  lastName?: string;
  zip?: string;
}) {
  const queryParams: OptionalQuery<Client>[] = [];
  if (!p.firstName && !p.lastName && !p.zip) {
    return [];
  }

  if (p.firstName) {
    queryParams.push({ firstName: ["==", p.firstName] });
  }
  if (p.lastName) {
    queryParams.push({ lastName: ["==", p.lastName] });
  }
  if (p.zip) {
    queryParams.push({ zip: ["==", p.zip] });
  }
  const results = (
    await getFirestoreHelper().Client.query({
      where: queryParams,
    })
  ).items;

  return results;
}
