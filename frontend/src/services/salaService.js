const API_URL = "http://localhost:3000/api/sala";
import { getAuthHeaders, handleResponse } from "./apiClient";

export async function createRoom(roomData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(true),
    body: JSON.stringify(roomData),
  });
  return handleResponse(response);
}

export async function listRooms() {
  const response = await fetch(API_URL, { headers: getAuthHeaders(false) });
  return handleResponse(response);
}

export async function getRoomById(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(false),
  });
  return handleResponse(response);
}

export async function updateRoom(id, roomData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(true),
    body: JSON.stringify(roomData),
  });
  return handleResponse(response);
}

export async function deleteRoom(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(false),
  });
  return handleResponse(response);
}
