import React from "react";

function RoomCard({ title, area, features, image, textbutton }) {
  return (
    <div className="room-card">
      <img src={image} alt={title} className="room-image" />
      <div className="card-content">
        <h3>{title}</h3>
        <ul>
          <li>{area}</li>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        <button className="btn-primary toRightTransition">
          {textbutton}
        </button>
      </div>
    </div>
  );
}

export default RoomCard;
