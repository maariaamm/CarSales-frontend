import { apiFetch } from '../utils/fetchWrapper.js';

export function login(username, password) {
  return apiFetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export function register(username, email, password) {
  return apiFetch('/api/users/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password, role: 'user' }),
  });
}