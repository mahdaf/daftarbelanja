// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9lA_bmun3Ut9pQzDGEEHJj8g4cVhv2bY",
  authDomain: "shop-list-21b61.firebaseapp.com",
  projectId: "shop-list-21b61",
  storageBucket: "shop-list-21b61.firebasestorage.app",
  messagingSenderId: "126957179207",
  appId: "1:126957179207:web:2dbc520694c12a6f16bc62",
  measurementId: "G-N9QM41ZZ60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };