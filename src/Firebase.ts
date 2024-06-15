import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

export function isDevelopmentEnv() {
  return process.env.NODE_ENV === 'development';
}

const firebaseConfig = {
  apiKey: "AIzaSyDJVleQTBlJ8_v-j76X6fPVSJUxoAvk4FA",
  authDomain: "poolclock-5eb50.firebaseapp.com",
  projectId: "poolclock-5eb50",
  storageBucket: "poolclock-5eb50.appspot.com",
  messagingSenderId: "1044046655019",
  appId: "1:1044046655019:web:fdc1802c87c0de5584c46e"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
if (isDevelopmentEnv()) { connectFirestoreEmulator(db, 'localhost', 8080); }

export { db };
