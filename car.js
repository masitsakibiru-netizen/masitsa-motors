import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const carId = params.get("id");
const carDetails = document.getElementById("carDetails");

async function loadCar() {
  if (!carId) {
    carDetails.innerHTML = `<div class="car-detail-card"><h2>No car selected.</h2><a href="cars.html" style="color:var(--gold)">← Back to Inventory</a></div>`;
    return;
  }

  try {
    const carRef = doc(db, "car", carId);
    const carSnap = await getDoc(carRef);

    if (!carSnap.exists()) {
      carDetails.innerHTML = `<div class="car-detail-card"><h2>Car not found.</h2><a href="cars.html" style="color:var(--gold)">← Back to Inventory</a></div>`;
      return;
    }

    // Increment view count
    await updateDoc(carRef, { views: increment(1) });

    const car = carSnap.data();
    const price = Number(car.Price || 0).toLocaleString();

    // Per-car WhatsApp message
    const waMsg = encodeURIComponent(
      `Hello Masitsa Motors! I am interested in the *${car.Brand || ""} ${car.Model || ""}* listed at *Ksh ${price}*.\n\nPlease send me more details, availability, and viewing arrangements.`
    );

    // Update floating WhatsApp button too
    const waFloat = document.getElementById("waFloat");
    if (waFloat) waFloat.href = `https://wa.me/254743485587?text=${waMsg}`;

    // Update page title
    document.title = `${car.Brand} ${car.Model} — Masitsa Motors`;

    carDetails.innerHTML = `
      <div class="car-detail-card">
        <a href="cars.html" style="display:inline-flex;align-items:center;gap:8px;color:var(--grey2);font-size:0.85rem;margin-bottom:24px;text-decoration:none;">
          <i class="fas fa-arrow-left"></i> Back to Inventory
        </a>

        <img src="${car.Image || car.image || 'imgs/hero.jpg'}"
             alt="${car.Brand} ${car.Model}"
             onerror="this.src='imgs/hero.jpg'">

        <h2>${car.Brand || ""} ${car.Model || ""}</h2>

        <div class="car-detail-info">
          <div class="info-item">
            <span>Fuel Type</span>
            <strong>${car.Fuel || "Not specified"}</strong>
          </div>
          <div class="info-item">
            <span>Transmission</span>
            <strong>${car.Transmission || "Not specified"}</strong>
          </div>
          ${car.Year ? `<div class="info-item"><span>Year</span><strong>${car.Year}</strong></div>` : ""}
          ${car.Mileage ? `<div class="info-item"><span>Mileage</span><strong>${Number(car.Mileage).toLocaleString()} km</strong></div>` : ""}
          <div class="info-item">
            <span>Price</span>
            <strong style="color:var(--gold);font-size:1.2rem;">Ksh ${price}</strong>
          </div>
        </div>

        <div class="car-stats">
          <span>👀 ${car.views || 0} Views</span>
          <span>❤️ ${car.likes || 0} Likes</span>
        </div>

        <a class="car-detail-wa" href="https://wa.me/254743485587?text=${waMsg}" target="_blank">
          <i class="fab fa-whatsapp" style="font-size:1.2rem;"></i>
          Enquire About This Car
        </a>
      </div>
    `;

  } catch (err) {
    console.error("Car load error:", err);
    carDetails.innerHTML = `
      <div class="car-detail-card">
        <h2>Failed to load car details.</h2>
        <a href="cars.html" style="color:var(--gold)">← Back to Inventory</a>
      </div>
    `;
  }
}

loadCar();
