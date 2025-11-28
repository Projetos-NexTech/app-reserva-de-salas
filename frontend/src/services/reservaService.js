const API_URL = "http://localhost:3000/api/reserva";

export async function createReservation(reservationData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
    });
    return response.json();
}

export async function listResevartions() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function getReservationById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export async function updateReservation(id, reservationData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
    });
    return response.json();
}

export async function deleteReservation(id) {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
}