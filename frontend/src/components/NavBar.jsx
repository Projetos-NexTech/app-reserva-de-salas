import React from "react";
import pinacotecaLogo from "../assets/logos/logo-pinacoteca-sp.png";

function NavBar() {
  return (
    <header className="navbar-container">
      <div className="navbar-top">
        <img
          className="logo"
          src={pinacotecaLogo}
          alt="Pinacoteca de São Paulo"
        />
        <div className="profile-group">
          <button className="btn-secondary toRightTransition">Criar conta</button>
          <button className="btn-tertiary toRightTransition">
            Entrar
          </button>
        </div>
      </div>
      <nav className="navbar-bottom">
        <ul className="menu-list">
          <li>
            <a href="#home">Início</a>
          </li>
          <li>
            <a href="#about">Minhas reservas</a>
          </li>
          <li>
            <a href="#rooms">Salas</a>
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
