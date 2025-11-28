const API_URL = "http://localhost:3000/api/reserva";
import { getAuthHeaders, handleResponse } from "./apiClient";

export async function createReservation(reservationData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(true),
    body: JSON.stringify(reservationData),
  });
  return handleResponse(response);
}

export async function listResevartions() {
  const response = await fetch(API_URL, {
    headers: getAuthHeaders(false),
  });
  return handleResponse(response);
}

export async function getReservationById(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(false),
  });
  return handleResponse(response);
}

export async function updateReservation(id, reservationData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(true),
    body: JSON.stringify(reservationData),
  });
  return handleResponse(response);
}

export async function deleteReservation(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(false),
  });
  return handleResponse(response);
}
