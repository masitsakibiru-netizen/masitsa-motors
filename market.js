import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const marketplaceGrid =
document.getElementById("marketplaceGrid");

console.log("Marketplace Grid:", marketplaceGrid);

async function loadMarketplaceCars(){

  const snapshot =
  await getDocs(collection(db, "sellerCars"));

  console.log("Marketplace cars found:", snapshot.size);

  marketplaceGrid.innerHTML = "";

  snapshot.forEach((doc) => {

    const car = doc.data();

    console.log(car);

    if(car.Status === "Approved"){

      console.log("Approved car found:", car.Brand);

      marketplaceGrid.innerHTML += `

        <div class="car-card">

          <img src="${car.Image}" alt="${car.Brand}">

          <h3>${car.Brand} ${car.Model}</h3>

          <p>Ksh ${Number(car.Price).toLocaleString()}</p>

          <p>${car.Reason}</p>

          <button>
            Contact Masitsa Motors
          </button>

        </div>

      `;

    }

  });

}

loadMarketplaceCars();