import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const marketplaceGrid = document.getElementById("marketplaceGrid");

async function loadMarketplaceCars() {
  try {
    const snapshot = await getDocs(collection(db, "sellerCars"));

    const approved = [];
    snapshot.forEach(d => {
      const car = d.data();
      if (car.Status === "Approved") approved.push(car);
    });

    if (approved.length === 0) {
      marketplaceGrid.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-store"></i>
          <p>No marketplace cars approved yet. Check back soon!</p>
        </div>
      `;
      return;
    }

    marketplaceGrid.innerHTML = "";

    approved.forEach(car => {
      const waMsg = encodeURIComponent(
        `Hello Masitsa Motors! I am interested in the *${car.Brand || ""} ${car.Model || ""}* in the local marketplace at *Ksh ${Number(car.Price || 0).toLocaleString()}*. Please connect me with the seller.`
      );

      marketplaceGrid.innerHTML += `
        <div class="car-card">
          <img src="${car.Image || 'imgs/hero.jpg'}"
               alt="${car.Brand} ${car.Model}"
               onerror="this.src='imgs/hero.jpg'">
          <div class="car-info">
            <h3>${car.Brand || ""} ${car.Model || ""}</h3>
            <div class="car-details">
              ${car.Year ? `<p><strong>Year:</strong> ${car.Year}</p>` : ""}
              <p><strong>Status:</strong> <span style="color:#22C55E">✅ Verified</span></p>
            </div>
            <p class="price">Ksh ${Number(car.Price || 0).toLocaleString()}</p>
            ${car.Reason ? `<p style="color:var(--grey2);font-size:0.82rem;margin-bottom:14px;">${car.Reason}</p>` : ""}
            <a class="btn-wa" href="https://wa.me/254743485587?text=${waMsg}" target="_blank">
              <i class="fab fa-whatsapp"></i> Enquire via Masitsa Motors
            </a>
          </div>
        </div>
      `;
    });

  } catch (err) {
    console.error("Marketplace load error:", err);
    marketplaceGrid.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Failed to load marketplace cars. Please refresh.</p>
      </div>
    `;
  }
}

loadMarketplaceCars();
