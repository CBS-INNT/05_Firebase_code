import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAkTz6vhOztg4XE_6xYx97QZtCZJQ9xFmg",
  authDomain: "fir-test-18ba4.firebaseapp.com",
  projectId: "fir-test-18ba4",
  storageBucket: "fir-test-18ba4.firebasestorage.app",
  messagingSenderId: "54232126564",
  appId: "1:54232126564:web:508de600b8240ac5843b71",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// RTDB i Belgium (europe-west1)
export const rtdb = getDatabase(
  firebaseApp,
  "https://fir-test-18ba4-default-rtdb.europe-west1.firebasedatabase.app"
);
