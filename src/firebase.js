import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBckBBx_pH7oIboWKLdhvGVcxWvWu4BKMw",
  authDomain: "ticket-booking-86082.firebaseapp.com",
  projectId: "ticket-booking-86082",
  storageBucket: "ticket-booking-86082.firebasestorage.app",
  messagingSenderId: "192221659479",
  appId: "1:192221659479:web:5879709a1e6abb0e3a7e12"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, auth, db };