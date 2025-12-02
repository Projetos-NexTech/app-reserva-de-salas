import React from "react";
import pinaLogo from "../assets/logos/logo-pina.png";
import arrow from "../assets/icons/right-arrow.svg";

function Footer() {
  return (
    <footer class="">
      <div className="footer-top">
        <div className="pina">
          <img src={pinaLogo} alt="" />
          <a className="hiperlink">eventos@pinacoteca.org.br</a>
        </div>
        <div className="backToTop">
          <button className="toRightTransition">
            <img src={arrow} alt="seta para cima" />
          </button>
          <p>Voltar para o topo</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Design e desenvolvimento: NexTech</p>
      </div>
    </footer>
  );
}

export default Footer;
