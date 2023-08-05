import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrOmgOp2VFzT-hEY96N2M0yrIew7M0x0Y",
  authDomain: "carboxylation-9d578.firebaseapp.com",
  projectId: "carboxylation-9d578",
  storageBucket: "carboxylation-9d578.appspot.com",
  messagingSenderId: "84041114659",
  appId: "1:84041114659:web:545808d16ad54334ca7d96",
  measurementId: "G-8PH3RZYWE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app)

export { app , firestore , auth} ;