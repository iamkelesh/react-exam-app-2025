// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { data } from "react-router";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const firebaseConfig2 = {
  apiKey: "AIzaSyCQ4bZUIau0kd7dGdlVD1qJ2ipl6VsmgzU",
  authDomain: "react-app-project-be4f0.firebaseapp.com",
  projectId: "react-app-project-be4f0",
  storageBucket: "react-app-project-be4f0.firebasestorage.app",
  messagingSenderId: "752806815295",
  appId: "1:752806815295:web:2e87b60a66757b889d3a8a",
  measurementId: "G-SC78KESJ25"
};

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig2);
const firestoreDB = getFirestore(firebaseApp);
// const analytics = getAnalytics(app);

export { firebaseApp, firestoreDB }