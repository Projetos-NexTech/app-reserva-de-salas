import React from "react";

function RoomCard({ title, area, features = [], image, onClick }) {
  return (
    <div
      className="room-card"
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
          {features && features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
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

export default RoomCard;
