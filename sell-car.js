import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const imageInput =
document.getElementById("image");

if(imageInput){

  imageInput.addEventListener(
    "change",
    function(){

      const file = this.files[0];

      if(file){

        document.getElementById(
          "imageStatus"
        ).innerText =
        "📷 Selected: " + file.name;

      }

    }
  );

}

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

    status.innerHTML = `
      ⏳ Submitting your vehicle...
      Please wait.
    `;

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

    status.innerHTML = `

      <div class="success-box">

        <h3>✅ Submission Received</h3>

        <p>
        Your vehicle details have been received successfully.
        </p>

        <p>
        Current Status:
        <b>Pending Review</b>
        </p>

        <p>
        Masitsa Motors will review your vehicle and contact you through the WhatsApp number or email provided.
        </p>

      </div>

    `;

    document.getElementById("brand").value = "";
    document.getElementById("model").value = "";
    document.getElementById("price").value = "";
    document.getElementById("whatsapp").value = "";
    document.getElementById("email").value = "";
    document.getElementById("reason").value = "";
    document.getElementById("image").value = "";

    document.getElementById(
      "imageStatus"
    ).innerText =
    "No image selected";

  }catch(error){

    console.log(error);

    status.innerHTML = `
      ❌ Submission failed.
      Please try again.
    `;

  }

}