import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.submitCar = async function(){

  const brand =
  document.getElementById("brand").value;

  const model =
  document.getElementById("model").value;

  const price =
  document.getElementById("price").value;

  const whatsapp =
  document.getElementById("whatsapp").value;

  const email =
  document.getElementById("email").value;

  const reason =
  document.getElementById("reason").value;

  const image =
  document.getElementById("image").value;

  const status =
  document.getElementById("status");

  try{

    await addDoc(
      collection(db, "sellerCars"),
      {
        Brand: brand,
        Model: model,
        Price: Number(price),
        WhatsApp: whatsapp,
        Email: email,
        Reason: reason,
        Image: image,
        Status: "Pending",
        CreatedAt: new Date()
      }
    );

    status.innerText =
    "Your car has been submitted for review.";

  }catch(error){

    console.log(error);

    status.innerText =
    "Submission failed.";

  }

}