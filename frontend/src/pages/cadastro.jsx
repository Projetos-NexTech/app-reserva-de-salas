import React from "react";

function Cadastro() {
  return (
    <div>
      <div class="left-content">
        <img src="../public/react.svg" alt="Logo" />
        <h1>CADASTRO</h1>
        <form id="login-form">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="exmplo@gmail.com" required />

          <label htmlFor="password">Senha</label>
          <input type="password" placeholder="Senha" required />

          <button>Esqueci minha senha</button>
          <button type="submit">Entrar</button>
        </form>
      </div>

      <div class="right-content">
        <img src="../public/vite.svg" alt="Foto Pinacoteca" />
      </div>
    </div>
  );
}
export default Cadastro;
