import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import pinacotecaLogo from "../assets/logos/logo-pinacoteca-sp.png";

function NavBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="navbar-container">
      <div className="navbar-top">
        <img
          className="logo"
          src={pinacotecaLogo}
          alt="Pinacoteca de São Paulo"
        />
        <div className="profile-group">
          {!user && (
            <>
              <button className="btn-secondary toRightTransition">
                Criar conta
              </button>
              <button className="btn-tertiary toRightTransition">Entrar</button>
            </>
          )}

          {user && (
            <>
              <button className="btn-secondary toRightTransition">
                {user && (user.nome || user.name || user.email)}
              </button>
              <button
                className="btn-tertiary toRightTransition"
                onClick={logout}
              >
                Sair
              </button>
            </>
          )}
        </div>
      </div>
      <nav className="navbar-bottom">
        <ul className="menu-list">
          <li>
            <a href="/home">Início</a>
          </li>
          <li>
            <a href="/minhas-reservas">Minhas reservas</a>
          </li>
          <li>
            <a href="/salas">Salas</a>
          </li>
          <li>
            <a href="#contact">Contato</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
