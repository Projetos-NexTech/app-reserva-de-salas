const USER_API = "http://localhost:3000/api/usuario";
const ADMIN_API = "http://localhost:3000/api/admin";

async function postJson(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok)
    throw new Error(data.error || data.message || "Erro de autenticação");
  return data;
}

export async function loginUser(email, senha) {
  const data = await postJson(`${USER_API}/login`, { email, senha });
  return {
    usuario: data.usuario || data.user || null,
    token: data.token || null,
    raw: data,
    role: "user",
  };
}

export async function loginAdmin(email, senha) {
  const data = await postJson(`${ADMIN_API}/login`, { email, senha });
  return {
    usuario: data.admin || null,
    token: data.token || null,
    raw: data,
    role: "admin",
  };
}

// login automático: tenta usuário e, em seguida, admin
export async function login(email, senha) {
  try {
    return await loginUser(email, senha);
  } catch (errUser) {
    try {
      return await loginAdmin(email, senha);
    } catch (errAdmin) {
      const message =
        errAdmin?.message || errUser?.message || "Credenciais inválidas";
      throw new Error(message);
    }
  }
}

export async function resetPasword(email) {
  const response = await fetch(`${USER_API}/reset-password`, {
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
  const response = await fetch(`${USER_API}/sync-auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sendResetEmail }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro na sincronização");
  }

  return data;
}
