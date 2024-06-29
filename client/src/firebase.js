// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dashboard1936.firebaseapp.com",
  projectId: "dashboard1936",
  storageBucket: "dashboard1936.appspot.com",
  messagingSenderId: "26808266559",
  appId: "1:26808266559:web:edfa0972dab8ea8252ed8a",
  measurementId: "G-Q8T4MT6H4T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
