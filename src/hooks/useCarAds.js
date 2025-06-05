import { getAllAds } from '../api/carAds.js';

export async function renderAds(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const ads = await getAllAds();
    console.log('Fetched ads:', ads);
    container.innerHTML = ads.map(ad => `
      <div class="car-card">
        <h2>${ad.model} ${ad.year}</h2>
        <p><strong>Brand:</strong> ${ad.brand}</p>
        <p><strong>model:</strong> ${ad.model} kr</p>
        <p><strong>price:</strong> ${ad.price}</p>
        <p><strong>year:</strong> ${ad.year}</p>
        <p><strong>description:</strong> ${ad.description}</p>
        <p><strong>fueltype:</strong> ${ad.fueltype}</p>
        <img src="${ad.imageUrl}" alt="${ad.model}" />
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<p>Error loading ads: ${err.message}</p>`;
  }
}
