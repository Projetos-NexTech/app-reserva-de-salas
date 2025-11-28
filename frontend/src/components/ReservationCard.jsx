import React from "react";

function ReservationCard({ title, area, capacity, image, onClick }) {
  return (
    <div
      className="reservation-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onClick) onClick(e);
      }}
    >
      <img src={image} alt={title} className="room-image" />
      <div className="card-content">
        <h3>{title}</h3>
        <ul>
          <li>{area}</li>
          <li>{capacity}</li>
        </ul>

        <button
          type="button"
          className="btn-primary toRightTransition"
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick(e);
          }}
        >
          Conferir disponibilidade
        </button>
      </div>
    </div>
  );
}

export default ReservationCard;
