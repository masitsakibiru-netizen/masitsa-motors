import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const carGrid = document.getElementById("carGrid");

async function loadCars() {
  try {
    const snapshot = await getDocs(collection(db, "car"));

    if (snapshot.empty) {
      carGrid.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-car"></i>
          <p>No inventory available right now. Check back soon!</p>
        </div>
      `;
      return;
    }

    carGrid.innerHTML = "";

    snapshot.forEach((document) => {
      const car = document.data();
      const carId = document.id;

      // Build WhatsApp message for this specific car
      const waMsg = encodeURIComponent(
        `Hello Masitsa Motors! I am interested in the *${car.Brand || ""} ${car.Model || ""}* listed at *Ksh ${Number(car.Price || 0).toLocaleString()}*. Please send me more details and availability.`
      );

      carGrid.innerHTML += `
        <div class="car-card">
          <img src="${car.Image || car.image || 'imgs/hero.jpg'}" 
               alt="${car.Brand} ${car.Model}"
               onerror="this.src='imgs/hero.jpg'">
          <div class="car-info">
            <h3>${car.Brand || ""} ${car.Model || ""}</h3>
            <div class="car-details">
              <p><strong>Fuel:</strong> ${car.Fuel || "—"}</p>
              <p><strong>Trans:</strong> ${car.Transmission || "—"}</p>
              ${car.Year ? `<p><strong>Year:</strong> ${car.Year}</p>` : ""}
              ${car.Mileage ? `<p><strong>KM:</strong> ${Number(car.Mileage).toLocaleString()}</p>` : ""}
            </div>
            <p class="price">Ksh ${Number(car.Price || 0).toLocaleString()}</p>
            <p class="likes">❤️ <span id="likes-${carId}">${car.likes || 0}</span> Likes &nbsp;|&nbsp; 👀 ${car.views || 0} Views</p>
            <div class="car-card-actions">
              <button class="btn-view" onclick="window.location.href='car.html?id=${carId}'">
                View Details
              </button>
              <button class="btn-like" onclick="likeCar('${carId}')">❤️</button>
            </div>
            <a class="btn-wa" href="https://wa.me/254743485587?text=${waMsg}" target="_blank">
              <i class="fab fa-whatsapp"></i> Enquire on WhatsApp
            </a>
          </div>
        </div>
      `;
    });

  } catch (err) {
    console.error("Error loading cars:", err);
    carGrid.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Failed to load cars. Please refresh the page.</p>
      </div>
    `;
  }
}

window.likeCar = async function(carId) {
  try {
    await updateDoc(doc(db, "car", carId), {
      likes: increment(1)
    });
    const likeEl = document.getElementById("likes-" + carId);
    if (likeEl) likeEl.textContent = parseInt(likeEl.textContent || 0) + 1;
  } catch (err) {
    console.error("Like error:", err);
  }
};

loadCars();
