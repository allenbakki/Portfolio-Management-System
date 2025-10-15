// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZq2nIvWnx-sC7sORSvvwqqeA5R-MJ1_w",
  authDomain: "expense-tracker-3f69a.firebaseapp.com",
  projectId: "expense-tracker-3f69a",
  storageBucket: "expense-tracker-3f69a.firebasestorage.app",
  messagingSenderId: "280464608828",
  appId: "1:280464608828:web:5899e2bb2c3036438ebd39",
  measurementId: "G-66KB0MXMM0"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
