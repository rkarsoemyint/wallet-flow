import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDMe9I1eTOB20lwpalP8sknwv36UYkZnxk",
  authDomain: "wallet-flow-72583.firebaseapp.com",
  projectId: "wallet-flow-72583",
  storageBucket: "wallet-flow-72583.firebasestorage.app",
  messagingSenderId: "14408120000",
  appId: "1:14408120000:web:e66e353e910646a9f51f25",
  measurementId: "G-CCMXCJZ2N5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app); 

export default app;