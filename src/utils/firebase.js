// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf7QVIYJVtnEWGsguCD0FbTFKCujn8eT4",
  authDomain: "netflix-gpt-2c314.firebaseapp.com",
  projectId: "netflix-gpt-2c314",
  storageBucket: "netflix-gpt-2c314.firebasestorage.app",
  messagingSenderId: "818584302419",
  appId: "1:818584302419:web:cbc90352c6a4492a76e7a6",
  measurementId: "G-RFB9Q9SJ41",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
