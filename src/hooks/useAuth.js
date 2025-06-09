import { login, register } from '../api/auth.js';

export function handleLogin(formElement) {
  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = formElement.username.value;
    const password = formElement.password.value;

    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      alert('Login successful!');
      window.location.href = '/';
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  });
}



export function handleRegister(formElement) {
  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = formElement.username.value;
    const email = formElement.email.value;
    const password = formElement.password.value;

    try {
      const data = await register(username, email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      alert('Registration successful!');
      window.location.href = '/';
    } catch (err) {
      alert('Registration failed: ' + err.message);
    }
  });
}