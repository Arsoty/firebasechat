import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOeFzBO6l9rOeK5pKFjda2CLbkjiRTkSw",
  authDomain: "fir-chat-19230.firebaseapp.com",
  projectId: "fir-chat-19230",
  storageBucket: "fir-chat-19230.appspot.com",
  messagingSenderId: "1093896585196",
  appId: "1:1093896585196:web:c7dd85ab2783ba0fb80ac9",
  measurementId: "G-EN4NGQ0GP2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const conversationsRef = collection(db, "conversations");
export const messageRef = collection(
  db,
  "conversations",
  "PSmzGOBFG0sMFERLBIrS",
  "message"
);

export default app;
