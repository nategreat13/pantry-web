import { getFirestoreHelper } from "../../services/firebase.service";

export async function getNewPantryId() {
  let validId: number | undefined = undefined;
  while (!validId) {
    const possibleId = Math.floor(100000 + Math.random() * 899999);

    const existingPantries = (
      await getFirestoreHelper().Pantry.query({
        where: [{ id: ["==", `${possibleId}`] }],
      })
    ).items;

    if (!existingPantries.length) {
      validId = possibleId;
    }
  }

  return validId;
}
