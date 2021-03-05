import firebase from "firebase";
import { createFirestoreLift, FirestoreLiftCollection } from "firebase-lift";
import { firebaseConfig } from "../config/firebase.config";
import { Client } from "../models/client.schema";
import { ClientCheckin } from "../models/clientCheckin.schema";
import { Pantry } from "../models/pantry.schema";

let app: firebase.app.App;

require("firebase/auth");
require("firebase/firestore");
app = firebase.initializeApp(firebaseConfig);

const pantryFirestore = createFirestoreLift<{
  Client: FirestoreLiftCollection<Client>;
  Pantry: FirestoreLiftCollection<Pantry>;
  ClientCheckin: FirestoreLiftCollection<ClientCheckin>;
}>({
  collections: {
    Client: {
      collection: "Client",
    },
    Pantry: {
      collection: "Pantry",
    },
    ClientCheckin: {
      collection: "ClientCheckin",
    },
  },
  firebaseApp: app,
  firestoreModule: firebase.firestore,
});

export function getPantryFirestore() {
  return pantryFirestore;
}
