// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-d7952.firebaseapp.com",
  projectId: "mern-auth-d7952",
  storageBucket: "mern-auth-d7952.firebasestorage.app",
  messagingSenderId: "696328790924",
  appId: "1:696328790924:web:99ad4f519cbad1b7c16ca9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);