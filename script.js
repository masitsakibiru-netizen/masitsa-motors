console.log("Masitsa Motors Loaded");
console.log("Masitsa Motors Loaded");

let cars = [];
const loginForm = document.getElementById("loginForm");

if(loginForm){

  loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    const message = document.getElementById("message");

    // SIMPLE LOGIN

    if(username === "admin" && password === "1234"){

      message.style.color = "lightgreen";

      message.innerText = "Login Successful";

      // Redirect after login

      setTimeout(() => {

        window.location.href = "index.html";

      }, 1500);

    }else{

      message.style.color = "red";

      message.innerText = "Wrong Username or Password";

    }

  });

}

// DISPLAY CARS

function displayCars(carList){

  const carGrid =
  document.getElementById("carGrid");

  carGrid.innerHTML = "";

  carList.forEach(car => {

    carGrid.innerHTML += `

      <div class="car-card">

        <img src="${car.Image}">

        <div class="car-info">

          <h3>
            ${car.Brand} ${car.Model}
          </h3>

          <p>
            Fuel: ${car.Fuel}
          </p>

          <p>
            Transmission: ${car.Transmission}
          </p>

          <p class="Price">
            Ksh ${car.Price.toLocaleString()}
          </p>

        </div>

      </div>

    `;

  });

}
import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const carGrid = document.getElementById("carGrid");

async function loadCars() {

  //console.log("Reading collection: car");

const snapshot =
await getDocs(collection(db, "car"));
    console.log("Car found:", snapshot.size);

  carGrid.innerHTML = "";

  snapshot.forEach((doc) => {

    const car = doc.data();
    console.log(car);

    cars.push(car);

    carGrid.innerHTML += `
      <div class="car-card">
        <img src="${car.Image}">
        <h3>${car.Brand} ${car.Model}</h3>
        <p>Ksh ${car.Price}</p>
      </div>
    `;

  });

}

loadCars();
// MOBILE MENU

const menuToggle =
document.getElementById("menuToggle");

const navbar =
document.getElementById("navbar");

menuToggle.addEventListener("click", () => {

  navbar.classList.toggle("active");

});

// INITIAL LOAD

 loadCars();

// SEARCH FUNCTION

function searchCars(){

  const Brand =
  document.getElementById("brand")
  .value.toLowerCase();

  const Model =
  document.getElementById("Model")
  .value.toLowerCase();

  const Fuel =
  document.getElementById("Fuel")
  .value.toLowerCase();

  const Transmission =
  document.getElementById("Transmission")
  .value.toLowerCase();

  const Price =
  document.getElementById("Price")
  .value;

  const filteredCars = cars.filter(car => {

    return (

      (Brand === "" ||
      car.Brand.toLowerCase().includes(brand))

      &&

      (Model === "" ||
      car.Model.toLowerCase().includes(model))

      &&

      (Fuel === "" ||
      car.Fuel.toLowerCase().includes(fuel))

      &&

      (Transmission === "" ||
      car.Transmission.toLowerCase().includes(transmission))

      &&

      (Price === "" ||
      car.Price <= Number(price))

    );

  });

  displayCars(filteredCars);

}


window.searchCars = searchCars;