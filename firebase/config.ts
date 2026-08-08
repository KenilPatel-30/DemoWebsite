import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Stubbed config - the user will replace these with their actual credentials
const firebaseConfig = {
  apiKey: "AIzaSyBXV0mCUGq80jvygNSljLgo2f6V71mdI6M",
  authDomain: "demowebsite-ab190.firebaseapp.com",
  projectId: "demowebsite-ab190",
  storageBucket: "demowebsite-ab190.firebasestorage.app",
  messagingSenderId: "768036954015",
  appId: "1:768036954015:web:33cbe298cfe8d9b98aa7aa",
  measurementId: "G-67W8DLG8C7"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore
const db = getFirestore(app);

export { app, db };
