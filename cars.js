import {
  doc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
console.log("Cars page loaded");
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "masitsa-motors.firebaseapp.com",
  projectId: "masitsa-motors",
  storageBucket: "masitsa-motors.firebasestorage.app",
  messagingSenderId: "443898937470",
  appId: "YOUR_APP_ID"
};

import { db } from "./firebase.js";

const carGrid = document.getElementById("carGrid");

async function loadCars() {

  const snapshot =
    await getDocs(collection(db, "car"));

    console.log("Car found:", snapshot.size);

  snapshot.forEach((doc) => {

    const car = doc.data();
    console.log(car);

    carGrid.innerHTML += `
<div class="car-card">

  <img src="${car.Image}">

  <div class="car-info">

    <h3>${car.Brand} ${car.Model}</h3>

    <div class="car-details">
      <p><strong>Fuel:</strong> ${car.Fuel}</p>
      <p><strong>Transmission:</strong> ${car.Transmission}</p>
    </div>

    <p class="price">
      Ksh ${Number(car.Price).toLocaleString()}
    </p>

    <p class="likes">
      ❤️ ${car.likes || 0} Likes
    </p>

    <button
onclick="window.location.href='car.html?id=${doc.id}'">
  View Details
</button>

    <button onclick="likeCar('${doc.id}')">
      ❤️ Like
    </button>

  </div>

</div>

    `;
  });

}

loadCars();
window.likeCar = async function(carId){

  await updateDoc(
    doc(db, "car", carId),
    {
      likes: increment(1)
    }
  );

  alert("Thanks for liking this car!");

  location.reload();
}