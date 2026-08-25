import { initializeApp } from "firebase/app";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";

export function isDevelopmentEnv() {
  return process.env.NODE_ENV === 'development';
}

const firebaseConfig = {
  apiKey: "AIzaSyDJVleQTBlJ8_v-j76X6fPVSJUxoAvk4FA",
  authDomain: "poolclock-5eb50.firebaseapp.com",
  databaseURL: "https://poolclock-5eb50-default-rtdb.firebaseio.com",
  projectId: "poolclock-5eb50",
  storageBucket: "poolclock-5eb50.appspot.com",
  messagingSenderId: "1044046655019",
  appId: "1:1044046655019:web:fdc1802c87c0de5584c46e"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
if (isDevelopmentEnv()) { connectDatabaseEmulator(db, 'localhost', 9000); }

export { db };
