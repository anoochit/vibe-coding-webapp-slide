import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, Firestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, FirebaseStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const isDev = 
  process.env.NODE_ENV === "development" || 
  (typeof window !== "undefined" && 
    (window.location.hostname === "localhost" || 
     window.location.hostname === "127.0.0.1" ||
     window.location.hostname.endsWith(".local")));

// In development, we can run with mock/demo config if no keys are provided
const hasRequiredKeys = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.authDomain
);

export const isFirebaseConfigured = hasRequiredKeys || isDev;

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (isFirebaseConfigured) {
  try {
    const activeApps = getApps();
    
    // In dev mode without keys, use dummy config for local emulator suite
    const configToUse = hasRequiredKeys 
      ? firebaseConfig 
      : {
          apiKey: "demo-key-1234567890",
          authDomain: "redlinesoft-b7a4f.firebaseapp.com",
          projectId: "redlinesoft-b7a4f",
          storageBucket: "redlinesoft-b7a4f.appspot.com",
          messagingSenderId: "1234567890",
          appId: "1:1234567890:web:1234567890",
        };

    if (activeApps.length === 0) {
      app = initializeApp(configToUse);
    } else {
      app = getApp();
    }

    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    // If we are in development mode, connect to the local emulators!
    if (isDev) {
      // Connect Auth Emulator (on port 9099)
      // Check to prevent multiple connection errors on hot-reloading
      if (!(auth as any)._emulatorConfig) {
        connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
      }
      // Connect Firestore Emulator (on port 8080)
      if (!(db as any)._emulatorConfig) {
        connectFirestoreEmulator(db, "127.0.0.1", 8080);
      }
      // Connect Storage Emulator (on port 9199)
      if (!(storage as any)._emulatorConfig) {
        connectStorageEmulator(storage, "127.0.0.1", 9199);
      }
      console.log("🔥 Successfully connected to local Firebase Emulator Suite!");
    }
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
  }
}

export { auth, db, storage };
