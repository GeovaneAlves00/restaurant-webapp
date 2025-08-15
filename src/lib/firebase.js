import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQpjDfiBxs_P-DFuiJAH83h9Yvqo2MPMc",
  authDomain: "saborexpress-a9005.firebaseapp.com",
  projectId: "saborexpress-a9005",
  storageBucket: "saborexpress-a9005.firebasestorage.app",
  messagingSenderId: "681068168842",
  appId: "1:681068168842:web:74de8086435e9d49ce8f73"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);