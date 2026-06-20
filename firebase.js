import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyByfve7o8vNH4F_EHQ7Vk7Y_UAtREIm1bg",
  authDomain: "masitsa-motors.firebaseapp.com",
  projectId: "masitsa-motors",
  storageBucket: "masitsa-motors.firebasestorage.app",
  messagingSenderId: "443898937470",
  appId: "1:443898937470:web:72ebdd5f8a0a5658d4582f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
