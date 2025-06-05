// const API_BASE = 'https://9a6b9713ec6e348be8eb4ef4b79ca200.serveo.net';
 const API_BASE = 'http://localhost:3000';


export async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json', ...(token && { 'Authorization': `Bearer ${token}` }) };

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
    });

    try {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'An error occurred');
        }
        return data;
    }
    catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}