import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/logo-pina.png";
import rightarrow from "../assets/icons/right-arrow.svg";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setUser } = useContext(AuthContext);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token || "FAKE_TOKEN");
      localStorage.setItem("user", JSON.stringify(data.usuario));
      // Atualiza o contexto de autenticação para refletir o login imediatamente
      if (setUser) setUser(data.usuario);

      navigate("/home");
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
        <h1>Bem-vindo de volta!</h1>

        <form id="login-form" className="input-group" onSubmit={handleLogin}>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
