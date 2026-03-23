import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuIYwgAvKxKkGcLPF7SYrdoINyPrBwNWI",
  authDomain: "visionglass-f9d38.firebaseapp.com",
  projectId: "visionglass-f9d38",
  storageBucket: "visionglass-f9d38.firebasestorage.app",
  messagingSenderId: "739153463147",
  appId: "1:739153463147:web:8605c63aa2c20c28212e2e",
  measurementId: "G-MKSRXFTMRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };
export default app;
