import { apiFetch } from '../utils/fetchWrapper.js';


export async function getAllAds() {
    return apiFetch('/api/carAds');
}

export async function getAdById(id) {
    return apiFetch(`/api/carAds/${id}`);
}

export async function createAd(adData) {
    return apiFetch('/api/carAds', {
      method: 'POST',
      body: JSON.stringify(adData)
    });
  }
  
  export async function updateAd(id, adData) {
    return apiFetch(`/api/carAds/${id}`, {
      method: 'PUT',
      body: JSON.stringify(adData)
    });
  }
  
  export async function deleteAd(id) {
    return apiFetch(`/api/carAds/${id}`, {
      method: 'DELETE'
    });
  }