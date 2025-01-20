const API_BASE_URL = 'http://localhost:3000/api';

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Erro ao realizar a requisição de login:", error);
    throw error;
  }
}

const JWT_TOKEN = "jwtToken";

export function authenticationToken() {
  return localStorage.getItem(JWT_TOKEN);
}

export function saveSession(token) {
  return localStorage.setItem(JWT_TOKEN, token);
}

export function endSession() {
  return localStorage.removeItem(JWT_TOKEN);
}
