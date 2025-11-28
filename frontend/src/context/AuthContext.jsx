import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

 useEffect(() => {
   try {
     const savedUser = localStorage.getItem("user");
     if (savedUser && savedUser !== "undefined") {
       setUser(JSON.parse(savedUser));
     }
   } catch (error) {
     console.error("Erro ao ler usuário do localStorage:", error);
     localStorage.removeItem("user"); // limpa dados inválidos
   }
 }, []);

 function logout() {
   localStorage.removeItem("token");
   localStorage.removeItem("user");
   setUser(null);
 }

  return (
    <div>
      <AuthContext.Provider value={{ user, setUser, logout }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
}
