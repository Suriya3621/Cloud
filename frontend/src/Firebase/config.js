// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUFonJ4hNN9NqFvY4O-va-jOkzAX0IFOY",
  authDomain: "installar-1202.firebaseapp.com",
  projectId: "installar-1202",
  storageBucket: "installar-1202.appspot.com",
  messagingSenderId: "953423242639",
  appId: "1:953423242639:web:b3da84883cee716cc797fa",
  measurementId: "G-7B4SX1FPVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { app, db, storage,analytics};
