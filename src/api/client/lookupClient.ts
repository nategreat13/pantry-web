import { OptionalQuery } from "firebase-lift";
import { Client } from "../../models/client.schema";
import { getPantryFirestore } from "../../services/firebase.service";

export async function lookupClient(p: {
  firstName?: string;
  lastName?: string;
  zip?: string;
  pantryId: string;
}) {
  const queryParams: OptionalQuery<Client>[] = [];
  if (!p.firstName && !p.lastName && !p.zip) {
    return [];
  }

  if (!(p.firstName && p.lastName)) {
    queryParams.push({ registeredPantries: { [p.pantryId]: ["==", true] } });
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
    await getPantryFirestore().Client.query({
      where: queryParams,
    })
  ).docs;

  return results;
}
