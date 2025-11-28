import React, { useEffect, useState } from "react";
import rightarrow from "../assets/icons/right-arrow.svg";
import "../styles/components/dashboard.css";
import { listResevartions } from "../services/reservaService";
import { listRooms } from "../services/salaService";
import { listUsers } from "../services/usuarioService";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [roomsMap, setRoomsMap] = useState({});
  const [usersMap, setUsersMap] = useState({});

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        setLoading(true);
        const [roomsData, reservationsData, usersData] = await Promise.all([
          listRooms(),
          listResevartions(),
          listUsers(),
        ]);

        if (!mounted) return;

        const map = {};
        if (Array.isArray(roomsData)) {
          roomsData.forEach((r) => {
            if (r && r.id) map[r.id] = r;
          });
        }

        setRoomsMap(map);
        const uMap = {};
        if (Array.isArray(usersData)) {
          usersData.forEach((u) => {
            if (u && (u.id || u._id)) uMap[u.id || u._id] = u;
          });
        }
        setUsersMap(uMap);
        setReservations(Array.isArray(reservationsData) ? reservationsData : []);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Erro ao carregar dados do dashboard");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const groupedByRoom = reservations.reduce((acc, r) => {
    const roomId = r.salaId || r.sala || "unknown";
    if (!acc[roomId]) acc[roomId] = [];
    acc[roomId].push(r);
    return acc;
  }, {});

  return (
    <section className="dashboard">
      <div className="section-title-group">
        <h1 className="white-title">Dashboard</h1>

        <button className="btn-primary toRightTransition white">
          Confira todas as reservas
          <img className="arrow" src={rightarrow} alt="" />
        </button>
      </div>

      <div className="rooms-group dashboard-rooms">
        {loading && <p>Carregando reservas...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <div>
            {Object.keys(groupedByRoom).length === 0 && (
              <p>Nenhuma reserva encontrada.</p>
            )}

            {Object.entries(groupedByRoom).map(([roomId, roomReservations]) => (
              <div key={roomId} className="room-group">
                <h3 className="room-group-title">{roomsMap[roomId]?.nome || `Sala ${roomId}`}</h3>
                <div className="reservation-list">
                  {roomReservations.map((res) => (
                    <div key={res.id} className="reservation-card">
                      <div className="reservation-info">
                        <div className="reservation-user"><strong>Usuário:</strong> {usersMap[res.usuarioId]?.nome || usersMap[res.usuario]?.nome || res.usuarioId || res.usuario || "-"}</div>
                        <div className="reservation-date"><strong>Data:</strong> {res.dataReserva}</div>
                        <div className="reservation-time"><strong>Horário:</strong> {res.horarioInicio} - {res.horarioFim}</div>
                      </div>

                      <div className="reservation-actions">
                        <button
                          className="btn-secondary"
                          type="button"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
