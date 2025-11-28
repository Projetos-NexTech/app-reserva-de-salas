const API_URL = "http://localhost:3000/api/usuario";

export async function login(email, senha) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro no login");
  }

  return response.json();
}

export async function resetPasword(email) {
  const response = await fetch(`${API_URL}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao solicitar redefinição");
  }

  return data;
}

export async function syncAuth(sendResetEmail = false) {
    const response = await fetch(`${API_URL}/sync-auth`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ sendResetEmail }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Erro na sincronização");
    }

    return data;
}
