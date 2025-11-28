const API_URL = "http://localhost:3000/api/sala";

export async function createRoom(roomData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(roomData),
    })
    return response.json();
}

export async function listRooms() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function getRoomById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export async function updateRoom(id, roomData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(roomData),
    });
    return response.json();
}

export async function deleteRoom(id) {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
}