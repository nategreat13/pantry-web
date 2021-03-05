import { OptionalQuery } from "firebase-lift";
import { Pantry } from "../../models/pantry.schema";
import { getPantryFirestore } from "../../services/firebase.service";

export async function lookupPantry(p: { name?: string; zip?: string }) {
  const queryParams: OptionalQuery<Pantry>[] = [];

  if (!p.name && !p.zip) {
    return [];
  }

  const terms = p.name
    ? p.name.split(" ").filter((t) => t !== "" && t !== " ")
    : [];

  terms.forEach((t) => {
    queryParams.push({ [`terms.${t.toLowerCase()}`]: ["==", true] });
  });

  // if (p.name) {
  //   queryParams.push({ name: ["==", p.name] });
  // }

  if (p.zip) {
    queryParams.push({ zip: ["==", p.zip] });
  }
  const results = (
    await getPantryFirestore().Pantry.query({
      where: queryParams,
    })
  ).docs;

  return results;
}
