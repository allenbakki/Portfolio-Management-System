import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqSV2gX1frRRo_f88MO5HH_ftbEWOxG4c",
  authDomain: "folio-6be7b.firebaseapp.com",
  projectId: "folio-6be7b",
  storageBucket: "folio-6be7b.firebasestorage.app",
  messagingSenderId: "320846733668",
  appId: "1:320846733668:web:798f389f4ef075dd289a71",
  measurementId: "G-PR7F2J13PY"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
