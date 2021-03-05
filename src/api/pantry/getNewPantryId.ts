import { getPantryFirestore } from "../../services/firebase.service";

export async function getNewPantryId() {
  let validId: number | undefined = undefined;
  while (!validId) {
    const possibleId = Math.floor(100000 + Math.random() * 899999);

    const existingPantries = (
      await getPantryFirestore().Pantry.query({
        where: [{ id: ["==", `${possibleId}`] }],
      })
    ).docs;

    if (!existingPantries.length) {
      validId = possibleId;
    }
  }

  return validId;
}
