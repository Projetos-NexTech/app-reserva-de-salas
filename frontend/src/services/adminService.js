const API_URL = "http://localhost:3000/api/admin";

export async function createAdmin(adminData) {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "aplication/json" },
    body: JSON.stringify(adminData),
  });
  return response.json();
}

export async function listAdmins() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function getAdminById(id) {
    const response = await fetch(`${API_URL}/${id}`)
    return response.json();
}
