import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/logo-pina.png";
import rightarrow from "../assets/icons/right-arrow.svg";

function Cadastro() {
  //Função para navegar entre páginas
  const navigate = useNavigate();
  function irPara(rota) {
    navigate(rota);
  }

  return (
    <div className="login-container">
      <div className="left-content">
        <img className="logo" src={logo} alt="Logo" />
        <h1>Crie uma nova conta</h1>

        <form id="login-form" className="input-group">
          <div className="full-name-group">
            <label htmlFor="name">Nome completo</label>
            <input type="name" required />
          </div>
          <div className="email-group">
            <label htmlFor="email">Email</label>
            <input type="email" required />
          </div>
          <div className="password-group">
            <label htmlFor="password">Senha</label>
            <input type="password" required />
          </div>

          <button className="btn-primary" type="submit">
            Criar
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
export default Cadastro;
