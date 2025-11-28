import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/logo-pina.png";
import rightarrow from "../assets/icons/right-arrow.svg";
import { resetPasword } from "../services/authService";

function RedefinirSenha() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");

async function handleSubmit(e) {
  e.preventDefault();

  try {
    const data = await resetPasword(email);
    alert("E-mail de recuperação de senha enviado com sucesso!")
  } catch (error) {
    alert(error.message);
  }
}

  //Função para navegar entre páginas
  function irPara(rota) {
    navigate(rota);
  }

  return (
    <div className="login-container">
      <div className="left-content">
        <img className="logo" src={logo} alt="Logo" />
        <h1>Redefina sua senha</h1>

        <form id="login-form" className="input-group" onSubmit={handleSubmit}>
          <div className="email-group">
            <label htmlFor="email">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
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
