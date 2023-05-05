import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAz7-QyErdLNuI5MNn9RYT_W1VR7GXwh_M",
  authDomain: "catch-the-egg-20160.firebaseapp.com",
  projectId: "catch-the-egg-20160",
  storageBucket: "catch-the-egg-20160.appspot.com",
  messagingSenderId: "206006275248",
  appId: "1:206006275248:web:87924f35066a65088c3f75",
  measurementId: "G-G1WHWEG8TQ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);