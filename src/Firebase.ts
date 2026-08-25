import { initializeApp } from "firebase/app";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";

export function isDevelopmentEnv() {
  return process.env.NODE_ENV === 'development';
}

function getFirebaseEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required Firebase environment variable: ${name}`);
  }
  return value;
}

const firebaseConfig = {
  apiKey: getFirebaseEnvVar('REACT_APP_FIREBASE_API_KEY'),
  authDomain: getFirebaseEnvVar('REACT_APP_FIREBASE_AUTH_DOMAIN'),
  databaseURL: getFirebaseEnvVar('REACT_APP_FIREBASE_DATABASE_URL'),
  projectId: getFirebaseEnvVar('REACT_APP_FIREBASE_PROJECT_ID'),
  storageBucket: getFirebaseEnvVar('REACT_APP_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getFirebaseEnvVar('REACT_APP_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getFirebaseEnvVar('REACT_APP_FIREBASE_APP_ID')
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
if (isDevelopmentEnv()) { connectDatabaseEmulator(db, 'localhost', 9000); }

export { db };
