// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQ4bZUIau0kd7dGdlVD1qJ2ipl6VsmgzU",
  authDomain: "react-app-project-be4f0.firebaseapp.com",
  projectId: "react-app-project-be4f0",
  storageBucket: "react-app-project-be4f0.firebasestorage.app",
  messagingSenderId: "752806815295",
  appId: "1:752806815295:web:2e87b60a66757b889d3a8a",
  measurementId: "G-SC78KESJ25"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebaseApp;