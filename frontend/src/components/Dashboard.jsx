import React from "react";
import rightarrow from "../assets/icons/right-arrow.svg";

function Dashboard() {
  return (
    <section>
      <div className="section-title-group">
        <h1 className="white-title">Dashboard</h1>

        <button className="btn-primary toRightTransition white">
          Confira todas as reservas
          <img className="arrow" src={rightarrow} alt="" />
        </button>
      </div>

      <div className="rooms-group"></div>
    </section>
  );
}

export default Dashboard;
