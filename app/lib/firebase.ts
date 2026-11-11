import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCuw8GfF4Xqs3oOPYJvc4XgYY4qd8m09j0",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "developer-sandaruwan.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "developer-sandaruwan",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "developer-sandaruwan.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "941265824684",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:941265824684:web:4887ae048cacc123f2a809",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-4CFW8CSBRJ",
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.appId);

function createFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseConfigured) return null;
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

const app = createFirebaseApp();

export const db: Firestore | null = app ? getFirestore(app) : null;
export const auth: Auth | null = typeof window !== "undefined" && app ? getAuth(app) : null;
export const storage: FirebaseStorage | null = typeof window !== "undefined" && app ? getStorage(app) : null;

export default app;
