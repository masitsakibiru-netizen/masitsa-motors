import { db } from "./firebase.js";
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.submitCar = async function() {
  const brand    = document.getElementById("brand").value.trim();
  const model    = document.getElementById("model").value.trim();
  const year     = document.getElementById("year").value.trim();
  const price    = document.getElementById("price").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const email    = document.getElementById("email").value.trim();
  const reason   = document.getElementById("reason").value.trim();
  const image    = document.getElementById("image").value.trim();
  const status   = document.getElementById("status");
  const btn      = document.getElementById("submitBtn");

  // Validate required fields
  if (!brand || !model || !price || !whatsapp || !email) {
    status.innerHTML = `<p style="color:#EF4444;margin-top:12px;">⚠️ Please fill in all required fields marked with *</p>`;
    return;
  }

  // Disable button & show loading
  btn.disabled = true;
  btn.textContent = "Submitting…";
  status.innerHTML = `<p style="color:var(--grey2);margin-top:12px;">⏳ Submitting your vehicle listing, please wait…</p>`;

  try {
    await addDoc(collection(db, "sellerCars"), {
      Brand:     brand,
      Model:     model,
      Year:      year || "Not specified",
      Price:     Number(price),
      WhatsApp:  whatsapp,
      Email:     email,
      Reason:    reason || "Not specified",
      Image:     image || "",
      Status:    "Pending",
      CreatedAt: new Date()
    });

    // Hide form on success
    document.getElementById("formSection").style.display = "none";
    btn.style.display = "none";

    // Show success message
    status.innerHTML = `
      <div class="success-box">
        <div style="font-size:2.5rem;margin-bottom:16px;">✅</div>
        <h3>Listing Submitted Successfully!</h3>
        <p>Your <strong>${brand} ${model}</strong> has been received and is now under review.</p>
        <p style="margin-top:12px;">Current Status: <span class="pending-badge">⏳ Pending Review</span></p>
        <p style="margin-top:16px;font-size:0.9rem;line-height:1.8;">
          Our team at Masitsa Motors will review your vehicle within <strong>24 hours</strong>.
          We will contact you via <strong>WhatsApp (${whatsapp})</strong> or
          email <strong>(${email})</strong> with next steps.
        </p>
        <a href="index.html" style="
          display:inline-block;
          margin-top:24px;
          padding:12px 28px;
          background:var(--gold);
          color:var(--black);
          border-radius:8px;
          font-weight:700;
          text-decoration:none;
        ">← Back to Home</a>
      </div>
    `;

  } catch (error) {
    console.error("Submission error:", error);
    status.innerHTML = `
      <p style="color:#EF4444;margin-top:12px;">
        ❌ Submission failed. Please check your connection and try again.
      </p>
    `;
    btn.disabled = false;
    btn.textContent = "Submit Listing for Review";
  }
};
