import { getApps, initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

function initialize() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  return { app, db, auth };
}

function connectToEmulators({
  app,
  auth,
  db
}: {
  app: any;
  auth: any;
  db: any;
}): {
  app: any;
  auth: any;
  db: any;
} {
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

  return connectToEmulators(initialize());
}
