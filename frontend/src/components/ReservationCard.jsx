import React from "react";

function ReservationCard({
  sala,
  data, // expect ISO string or Date
  horario, // string like "10:00 - 12:00"
  status,
  imagem,
  onClick,
}) {
  const formatDate = (d) => {
    if (!d) return "-";
    const dateObj = typeof d === "string" ? new Date(d) : d;
    return dateObj.toLocaleDateString();
  };

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
      <img
        src={imagem || "https://via.placeholder.com/400x300"}
        alt={sala}
        className="room-image"
      />
      <div className="card-content">
        <h3>{sala || "Sala"}</h3>

        <div>
          <p>
            <strong>Data:</strong> {formatDate(data)}
          </p>
          <p>
            <strong>Horário:</strong> {horario || "-"}
          </p>
          {status && (
            <p>
              <strong>Status:</strong> {status}
            </p>
          )}
        </div>

        <div style={{ marginTop: "auto" }}>
          <button
            type="button"
            className="btn-primary toRightTransition"
            onClick={(e) => {
              e.stopPropagation();
              if (onClick) onClick(e);
            }}
          >
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationCard;
