import firebase from "firebase";
import {
  FirestoreLift,
  BatchRunner,
  MagicDeleteString,
  MagicIncrementString,
  MagicServerTimestampString,
} from "firestore-lift";
import { Client } from "../models/client.schema";
import { Pantry } from "../models/pantry.schema";

export interface FirestoreHelper {
  Client: FirestoreLift<Client>;
  Pantry: FirestoreLift<Pantry>;
  _BatchRunner: BatchRunner;
  _MagicDeleteValue: any;
  _MagicIncrementValue: any;
  _MagicServerTimestamp: any;
  _RawFirebaseApp: firebase.app.App;
}

export function generateFirestoreHelper(config: {
  firestoreModule: typeof firebase.firestore;
  app: firebase.app.App;
}): FirestoreHelper {
  let batchRunner = new BatchRunner({
    firestoreModule: config.firestoreModule as any,
    app: config.app as any,
  });

  let firestoreHelper: any = {
    _BatchRunner: batchRunner,
    _MagicDeleteValue: MagicDeleteString,
    _MagicIncrementValue: MagicIncrementString,
    _MagicServerTimestamp: MagicServerTimestampString,
    _RawFirebaseApp: config.app,
  };

  const collections: string[] = ["Client", "Pantry"];
  const collectionNames: Record<string, string> = {
    Client: "Clients",
    Pantry: "Pantries",
  };

  collections.forEach((coll) => {
    firestoreHelper[coll] = new FirestoreLift<any>({
      collection: collectionNames[coll],
      prefixIdWithCollection:
        coll === "Client" || coll === "Pantry" ? false : true,
      addIdPropertyByDefault:
        coll === "Client" || coll === "Pantry" ? false : true,
      disableCache: true,
      batchRunner,
    });
  });

  return firestoreHelper;
}
