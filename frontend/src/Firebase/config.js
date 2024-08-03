import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyButt2SSc4Ld5S-94Xs_ytGSXsK_XNZrcA",
  authDomain: "cloud-upload12.firebaseapp.com",
  projectId: "cloud-upload12",
  storageBucket: "cloud-upload12.appspot.com",
  messagingSenderId: "715702473747",
  appId: "1:715702473747:web:97d37d35a86ffcfcbcdbe6",
  measurementId: "G-BGM3MYK1HG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
