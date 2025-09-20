// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBB5kDqjDgbUJIvp2hRmYTAsiYOCWHzQ4A",
  authDomain: "iyellowcardv2.firebaseapp.com",
  projectId: "iyellowcardv2",
  storageBucket: "iyellowcardv2.firebasestorage.app",
  messagingSenderId: "150799392919",
  appId: "1:150799392919:web:acd0f586d098c4b47549d2",
  measurementId: "G-GN8L7CDT17"
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// ✅ Export all services including app
export { app, db, storage, auth };
