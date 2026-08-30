import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Existing config for customer portal (agri-909a6)
const firebaseConfig = {
  apiKey: "AIzaSyCtfv8E0Oqe7rSW6wwE4F6ET2oScJ57HHQ",
  authDomain: "agri-909a6.firebaseapp.com",
  projectId: "agri-909a6",
  storageBucket: "agri-909a6.firebasestorage.app",
  messagingSenderId: "737838786165",
  appId: "1:737838786165:web:bb1329d0f354985dba7a3c",
  measurementId: "G-88R9Q7TE2N"
};

// New config for farmers portal (farmer-b00f2)
const farmerFirebaseConfig = {
  apiKey: "AIzaSyAZEvq-2zn0hJ53WPa9_IQgtlgRZp7xNws",
  authDomain: "farmer-b00f2.firebaseapp.com",
  projectId: "farmer-b00f2",
  storageBucket: "farmer-b00f2.firebasestorage.app",
  messagingSenderId: "391118722418",
  appId: "1:391118722418:web:070b6eeb47ba8d94e4f9eb",
  measurementId: "G-K89783YW7R"
};

// Initialize Firebase apps with safety checks
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let farmerApp;
try {
  farmerApp = getApp("farmerApp");
} catch {
  farmerApp = initializeApp(farmerFirebaseConfig, "farmerApp");
}

// Existing app instances (customer portal)
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);

// Farmer app instances
const farmerDb = getFirestore(farmerApp);
const farmerAuth = getAuth(farmerApp);

export { app, farmerApp, db, auth, farmerDb, farmerAuth, analytics };
export default app;
