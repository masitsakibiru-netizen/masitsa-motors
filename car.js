import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyByfve7o8vNH4F_EHQ7Vk7Y_UAtREIm1bg",
  authDomain: "masitsa-motors.firebaseapp.com",
  projectId: "masitsa-motors",
  storageBucket: "masitsa-motors.firebasestorage.app",
  messagingSenderId: "443898937470",
  appId: "1:443898937470:web:72ebdd5f8a0a5658d4582f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const params = new URLSearchParams(window.location.search);
const carId = params.get("id");

const carDetails = document.getElementById("carDetails");

async function loadCar() {

  const carRef = doc(db, "car", carId);

  const carSnap = await getDoc(carRef);

  if (!carSnap.exists()) {
    carDetails.innerHTML = "<h2>Car not found</h2>";
    return;
  }

  await updateDoc(carRef, {
    views: increment(1)
  });

  const car = carSnap.data();

  carDetails.innerHTML = `
    <div class="car-detail-card">

      <img src="${car.Image}" alt="${car.Brand}">

      <h2>${car.Brand} ${car.Model}</h2>

      <p><strong>Fuel:</strong> ${car.Fuel}</p>

      <p><strong>Transmission:</strong> ${car.Transmission}</p>

      <p><strong>Price:</strong> Ksh ${Number(car.Price).toLocaleString()}</p>

      <p>👀 ${car.views || 0} Views</p>

      <p>❤️ ${car.likes || 0} Likes</p>

    </div>
  `;
}

loadCar();
