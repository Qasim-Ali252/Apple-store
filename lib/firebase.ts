// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgT0CpxQ-Yt4a_UzaBMjcZtwUMsS3toh8",
  authDomain: "apple-store-a30aa.firebaseapp.com",
  projectId: "apple-store-a30aa",
  storageBucket: "apple-store-a30aa.firebasestorage.app",
  messagingSenderId: "201113745646",
  appId: "1:201113745646:web:ffb945dadc17b5b5c49bff"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);