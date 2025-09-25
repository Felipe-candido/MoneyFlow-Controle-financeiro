// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAToD-0PoTpdT6CmrM40nL1HNuEWgMF-dc",
  authDomain: "moneyflow-f6a3a.firebaseapp.com",
  projectId: "moneyflow-f6a3a",
  storageBucket: "moneyflow-f6a3a.firebasestorage.app",
  messagingSenderId: "628854882182",
  appId: "1:628854882182:web:d1e1c99906ed00f41fb607",
  measurementId: "G-L2PC76MHTM"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);


// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Exporte a instância para ser usada em outros lugares
export default firebase_app;