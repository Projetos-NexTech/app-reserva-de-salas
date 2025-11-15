import React from "react";

function Redefinir_senha() {
  return (
    <div>
      <div class="left-content">
        <img src="../public/react.svg" alt="Logo" />
        <h1>Redefinição de senha</h1>
        <form id="login-form">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="exmplo@gmail.com" required />

          <button>Enviar</button>
        </form>
      </div>

      <div class="right-content">
        <img src="../public/vite.svg" alt="Foto Pinacoteca" />
      </div>
    </div>
  );
}
export default Redefinir_senha;
