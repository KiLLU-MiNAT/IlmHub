import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore, doc, getDoc, setDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Deine Firebase Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyA8GZmL3H5YsGGcimZsgWrGN9yCGbQlpDA",
  authDomain: "ilhub-c160b.firebaseapp.com",
  projectId: "ilhub-c160b",
  storageBucket: "ilhub-c160b.firebasestorage.app",
  messagingSenderId: "776821056776",
  appId: "1:776821056776:web:82569df0a1005d8508f8bd",
  measurementId: "G-CBX07BVXW8"
};

// Firebase initialisieren (nur EINMAL)
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  await signInWithPopup(auth, provider);
}

export async function logout() {
  await signOut(auth);
}

export function watchAuth(cb) {
  return onAuthStateChanged(auth, cb);
}

// users/{uid}/progress/{courseId}
export async function getCourseProgress(uid, courseId) {
  const ref = doc(db, "users", uid, "progress", courseId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function setCourseProgress(uid, courseId, data) {
  const ref = doc(db, "users", uid, "progress", courseId);
  await setDoc(ref, { updatedAt: Date.now(), ...data }, { merge: true });
}

// users/{uid}/worksheets/{worksheetId}
export async function saveWorksheet(uid, worksheetId, answers) {
  const ref = doc(db, "users", uid, "worksheets", worksheetId);
  await setDoc(ref, { answers, updatedAt: Date.now() }, { merge: true });
}

export async function loadWorksheet(uid, worksheetId) {
  const ref = doc(db, "users", uid, "worksheets", worksheetId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}
