import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";
import {
  connectFirestoreEmulator,
  Firestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager
} from "firebase/firestore";

let auth: Auth;
let db: Firestore;
let app: FirebaseApp;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

function initialize() {
  app ??= initializeApp(firebaseConfig);
  db ??= initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    })
  });

  auth ??= getAuth(app);

  return { auth, app, db };
}

function connectToEmulators(): {
  app: any;
  auth: any;
  db: any;
} {
  const { app, auth, db } = initialize();

  if (location.hostname === "localhost") {
    connectAuthEmulator(auth, "http://localhost:9099", {
      disableWarnings: true
    });
    connectFirestoreEmulator(db, "localhost", 8080);
  }

  return { app, auth, db };
}

export default function getFirebase() {
  const existingApp = getApps()[0];

  if (existingApp) {
    return initialize();
  }

  return connectToEmulators();
}
