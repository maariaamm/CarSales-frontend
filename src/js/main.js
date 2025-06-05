import { handleLogin, handleRegister } from '../hooks/useAuth.js';
import { renderAds } from '../hooks/useCarAds.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('log-in-form');
  const registerForm = document.getElementById('register-form');
  const carAdsContainer = document.getElementById('carAdscontainer');

  if (loginForm) handleLogin(loginForm);
  if (registerForm) handleRegister(registerForm);
  if (carAdsContainer) renderAds('carAdscontainer');
});