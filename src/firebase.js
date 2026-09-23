import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAQwkOrP6RlpRngHPew_Kt81kQrk8s7WQ",
  authDomain: "stuffing-minds-notesnest.firebaseapp.com",
  projectId: "stuffing-minds-notesnest",
  storageBucket: "stuffing-minds-notesnest.firebasestorage.app",
  messagingSenderId: "852518893773",
  appId: "1:852518893773:web:b0c15b22518626bbee5184"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;