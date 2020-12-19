import firebase from "firebase";
import { firebaseConfig } from "./config/firebase.config";

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    console.error("Firebase initialization error raised", err.stack);
  }
}

const db = firebase.firestore();

export { db };
