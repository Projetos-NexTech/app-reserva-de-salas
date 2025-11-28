import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/logo-pina.png";
import rightarrow from "../assets/icons/right-arrow.svg";
import { createUser } from "../services/usuarioService";

function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
     const data = await createUser({ nome, email, senha });
      navigate("/login");
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
        <h1>Crie uma nova conta</h1>

        <form id="login-form" className="input-group" onSubmit={handleSubmit}>
          <div className="full-name-group">
            <label htmlFor="name">Nome completo</label>
            <input
              type="name"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="email-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
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
