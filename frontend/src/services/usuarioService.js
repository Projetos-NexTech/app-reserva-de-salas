const API_URL = "http://localhost:3000/api/usuario";
import { getAuthHeaders, handleResponse } from "./apiClient";

export async function createUser(userData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(true),
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const data = await handleResponse(response);
    throw new Error(data.menssage || data.message || "Erro ao criar usuário");
  }

  return handleResponse(response);
}

export async function listUsers() {
  const response = await fetch(API_URL, { headers: getAuthHeaders(false) });
  return handleResponse(response);
}

export async function getUserById(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(false),
  });
  return handleResponse(response);
}

export async function updateUser(id, userData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(true),
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
}

export async function deleteUser(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(false),
  });
  return handleResponse(response);
}
