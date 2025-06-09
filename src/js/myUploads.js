import { handleLogin, handleRegister } from '../hooks/useAuth.js';
import { renderAds, handleCreateAd } from '../hooks/useCarAds.js';

document.addEventListener('DOMContentLoaded', () => {
  const myAdsContainer = document.getElementById('carAdscontainer');
  if (myAdsContainer) renderAds('carAdscontainer', true)
});