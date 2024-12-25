// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-3ada3.firebaseapp.com",
  projectId: "mern-auth-3ada3",
  storageBucket: "mern-auth-3ada3.firebasestorage.app",
  messagingSenderId: "810437556739",
  appId: "1:810437556739:web:d8c4b18bebd133224fec36"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);