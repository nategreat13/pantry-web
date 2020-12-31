import firebase from "firebase";
import { firebaseConfig } from "../config/firebase.config";
import {
  FirestoreHelper,
  generateFirestoreHelper,
} from "../helpers/FirestoreHelper";

let app: firebase.app.App;
let firestoreHelper: FirestoreHelper;

export function getFirebase() {
  if (!app) {
    throw new Error("Firebase has not been initialized");
  }
  return app;
}

export function getFirestoreHelper() {
  if (!firestoreHelper) {
    throw new Error("FirestoreHelper has not been initialized");
  }
  return firestoreHelper;
}

export function initFirebase() {
  if (!firebase.apps.length) {
    require("firebase/auth");
    require("firebase/firestore");
    app = firebase.initializeApp(firebaseConfig);
    firestoreHelper = generateFirestoreHelper({
      firestoreModule: firebase.firestore,
      app: app,
    });
  }
}
