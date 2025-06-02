/*const API_BASE = 'https://u05-restful-api-fl36.onrender.com';*/

import './style.scss';

(() => {
  const API_BASE = 'http://localhost:3000';

console.log("main.js laddad");


  // ==== Functions =====

  // --- Login ---
  function loginUser(username, password) {
    fetch(`${API_BASE}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Login response:", data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          alert("Login successful!");
          window.location.href = "/userAccount.html";
        } else {
          alert("Login failed");
        }
      })
      .catch(err => console.error("Login error", err));
  }

  // --- Register ---
  function registerUser(username, email, password) {
    const role = "user"; 
  
    fetch("http://localhost:3000/api/users/register", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, role })
    })
      .then(async res => {
        const data = await res.json();
        console.log("Svar från backend:", data);
  
        if (!res.ok) {
          alert("Registration failed: " + data.message);
          return;
        }
  
        alert("Registration successful!");
        localStorage.setItem('token', data.token); 
        window.location.href = "/userAccount.html";
      })
      .catch(err => {
        console.error("Registration error", err);
        alert("Något gick fel vid registrering.");
      });
    }
  
  // ---Upload ad---
  async function uploadAd(formData) {
    try {
      const res = await fetch(`${API_BASE}/api/carAds`, {
        method: 'POST',
        body: formData,
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Ad uploaded successfully!");
        console.log("Ad data:", data);
      } else {
        alert(`Upload failed: ${data.message}`);
        console.error("Error:", data);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("An error occurred while uploading.");
    }
  }
  

  // --- Fetch car ads ---
  async function fetchCarAds() {
    try {
      const res = await fetch(`${API_BASE}/api/carAds`);
      const data = await res.json();
      console.log("Data from API", data);
      return data;
    } catch (err) {
      console.error("Error fetching car ads", err);
    }
  }

  // --- Render car ads ---
  async function renderCarAds() {
    const carAds = await fetchCarAds();
    const container = document.getElementById("carAdscontainer");

    if (!container) return;

    container.innerHTML = "";

    if (!carAds || carAds.length === 0) {
      container.innerHTML = "<p>No car ads found</p>";
      return;
    }

    carAds.forEach(ad => {
      const card = document.createElement("div");
      card.className = "car-card";
      card.innerHTML = `
        <h2>${ad.model} ${ad.year}</h2>
        <p><strong>Brand:</strong> ${ad.brand}</p>
        <p><strong>Model:</strong> ${ad.model}</p>
        <p><strong>Year:</strong> ${ad.year}</p>
        <p><strong>Fuel:</strong> ${ad.fuelType}</p>
        <p><strong>Price:</strong> ${ad.price} kr</p>
        <img src="${ad.imageUrl}" alt="${ad.model}" />

      `;
      container.appendChild(card);

  
    });
  }

  // ======= Event listeners =======

  document.addEventListener("DOMContentLoaded", () => {
    // Rendera car ads om container finns
    if (document.getElementById("carAdscontainer")) {
      renderCarAds();
    }

  
  });

  // --- Login-formulär ---
  const loginForm = document.getElementById("log-in-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = loginForm.username.value;
      const password = loginForm.password.value;
      loginUser(username, password);
    });
  }

  // --- Register-formulär ---
  const registerForm = document.getElementById("register-form");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const username = registerForm.querySelector('input[name="username"]').value;
      const email = registerForm.querySelector('input[name="email"]').value;
      const password = registerForm.querySelector('input[name="password"]').value;
  
      if (!username) {
        alert("Fill in username please!");
        return;
      }
      if (!email) {
        alert("Fill in your email please!");
        return;
      }
      if (!password) {
        alert("Fill in password please!");
        return;
      }
  
      registerUser(username, email, password);
    });
  }
  
  //--Create ad eventlistener---
  document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById("upload-form");
  
    if (uploadForm) {
      uploadForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const formData = new FormData(uploadForm);
        formData.append('user', '68229da8829ef4b28cf2e5e6'); // ⚠️ byt mot dynamiskt senare!

        await uploadAd(formData); 
      });
    }
  });
})();