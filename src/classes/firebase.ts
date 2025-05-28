// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAIvO_Q7BR85FwEBAsQ8eJ_47PxaGJV0o",
  authDomain: "casual-papers.firebaseapp.com",
  projectId: "casual-papers",
  storageBucket: "casual-papers.firebasestorage.app",
  messagingSenderId: "540754955890",
  appId: "1:540754955890:web:0e7ba36632f0e2eb787ceb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();