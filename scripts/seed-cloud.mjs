import "dotenv/config";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";

const app = initializeApp({
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
});
const auth = getAuth(app);
const db = getFirestore(app);

const email = process.env.SEED_EMAIL;
const password = process.env.SEED_PASSWORD;
const displayName = process.env.SEED_NAME;
const handle = process.env.SEED_HANDLE;

const cred = await createUserWithEmailAndPassword(auth, email, password);
await updateProfile(cred.user, { displayName });

await setDoc(doc(db, "users", cred.user.uid), {
  displayName,
  handle,
  createdAt: serverTimestamp(),
});

await addDoc(collection(db, "portfolios"), {
  ownerId: cred.user.uid,
  title: `${displayName}'s Portfolio`,
  slug: handle,
  published: false,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
});

console.log("Seeded cloud user + portfolio for", email);
process.exit(0);
