import { handleLogin, handleRegister } from '../hooks/useAuth.js';
import { renderAds, handleCreateAd } from '../hooks/useCarAds.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  if (loginForm) handleLogin(loginForm);

  const registerForm = document.getElementById('register-form');
  if (registerForm) handleRegister(registerForm);

  const createForm = document.getElementById('upload-form');
  if (createForm) handleCreateAd(createForm);

  const carAdsContainer = document.getElementById('carAdscontainer');
  if (carAdsContainer) renderAds('carAdscontainer');
});
