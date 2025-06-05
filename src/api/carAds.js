import { apiFetch } from '../utils/fetchWrapper.js';

export function getAllAds() {
  return apiFetch('/api/carAds');
}

export function getAdById(id) {
  return apiFetch(`/api/carAds/${id}`);
}

export function createAd(adData) {
  return apiFetch('/api/carAds', {
    method: 'POST',
    body: JSON.stringify(adData),
  });
}

export function updateAd(id, adData) {
  return apiFetch(`/api/carAds/${id}`, {
    method: 'PUT',
    body: JSON.stringify(adData),
  });
}

export function deleteAd(id) {
  return apiFetch(`/api/carAds/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
