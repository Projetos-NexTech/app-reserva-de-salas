import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/logo-pina.png";
import rightarrow from "../assets/icons/right-arrow.svg";

function RedefinirSenha() {
  //Função para navegar entre páginas
  const navigate = useNavigate();
  function irPara(rota) {
    navigate(rota);
  }

  return (
    <div className="login-container">
      <div className="left-content">
        <img className="logo" src={logo} alt="Logo" />
        <h1>Redefina sua senha</h1>

        <form id="login-form" className="input-group">
          <div className="email-group">
            <label htmlFor="email">Email</label>
            <input type="email" required />
          </div>

          <button className="btn-primary" type="submit">
            Enviar
            <img className="arrow" src={rightarrow} alt="" />
          </button>
        </form>

        <p>
          Já possui uma conta?
          <button className="hiperlink" onClick={() => irPara("/login")}>
            Faça login
          </button>
        </p>
      </div>

      <div className="right-content"></div>
    </div>
  );
}
export default RedefinirSenha;
