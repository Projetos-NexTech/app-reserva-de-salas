import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/logo-pina.png";
import rightarrow from "../assets/icons/right-arrow.svg";

function Login() {
  //Função para navegar entre páginas
  const navigate = useNavigate();
  function irPara(rota) {
    navigate(rota);
  }

  return (
    <div className="login-container">
      <div className="left-content">
        <img className="logo" src={logo} alt="Logo" />
        <h1>Bem-vindo de volta!</h1>

        <form id="login-form" className="input-group">
          <div className="email-group">
            <label htmlFor="email">Email</label>
            <input type="email" required />
          </div>
          <div className="password-group">
            <label htmlFor="password">Senha</label>
            <input type="password" required />
            <div className="forgot-my-password-group">
              <a
                className="hiperlink"
                onClick={() => irPara("/redefinir-senha")}
              >
                Esqueci minha senha
              </a>
            </div>
          </div>

          <button className="btn-primary toRightTransition" type="submit">
            Entrar
            <img className="arrow" src={rightarrow} alt="" />
          </button>
        </form>

        <p>
          Não tem uma conta?
          <a className="hiperlink" onClick={() => irPara("/cadastro")}>
            Crie uma
          </a>
        </p>
      </div>

      <div className="right-content"></div>
    </div>
  );
}
export default Login;
