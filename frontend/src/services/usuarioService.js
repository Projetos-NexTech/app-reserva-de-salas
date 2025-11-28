const API_URL = "http://localhost:3000/api/usuario";

export async function createUser(userData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
}

export async function listUsers() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function getUserById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export async function updateUser(id, userData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
}

export async function deleteUser(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

