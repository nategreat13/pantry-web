import { getPantryFirestore } from "../../services/firebase.service";

export async function getNewClientId() {
  let validId: number | undefined = undefined;
  while (!validId) {
    const possibleId = Math.floor(100000 + Math.random() * 899999);

    const existingClients = (
      await getPantryFirestore().Client.query({
        where: [{ id: ["==", `${possibleId}`] }],
      })
    ).docs;

    if (!existingClients.length) {
      validId = possibleId;
    }
  }

  return validId;
}
