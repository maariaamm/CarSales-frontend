import { getAdById } from '../api/carAds.js';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const adId = params.get('adId');

  if (!adId) {
    console.error('No adId provided');
    document.getElementById('adDetailsContainer').innerHTML = '<p>No ad ID provided</p>';
    return;
  }

  try {
    const ad = await getAdById(adId);
    renderAdDetails(ad);
  } catch (err) {
    console.error('Failed to load ad details:', err);
    document.getElementById('adDetailsContainer').innerHTML = '<p>Error loading ad details</p>';
  }
});

function renderAdDetails(ad) {
  const container = document.getElementById('adDetailsContainer');
  if (!container) return;

  container.innerHTML = `
    <h2>${ad.model} (${ad.year})</h2>
    <p><strong>Brand:</strong> ${ad.brand}</p>
    <p><strong>Price:</strong> ${ad.price} kr</p>
    <p><strong>Description:</strong> ${ad.description}</p>
    <p><strong>Fuel type:</strong> ${ad.fuelType || 'Unknown'}</p>
    <img src="${ad.imageUrl}" alt="${ad.model}" style="max-width:400px;">
  `;
}
