import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ReservationCard from "../components/ReservationCard";
import { AuthContext } from "../context/AuthContext";
import { listReservationsByUser } from "../services/reservaService";
import "../styles/pages/salas.css"; // reuse grid styles from salas

function MinhasReservas() {
  const { user } = useContext(AuthContext);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!user || !user.id) {
        setLoading(false);
        return;
      }
      try {
        const data = await listReservationsByUser(user.id);
        setReservas(data || []);
      } catch (err) {
        console.error("Erro ao buscar reservas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  return (
    <div>
      <NavBar />
      <main>
        <h1>Minhas Reservas</h1>

        {loading ? (
          <p>Carregando reservas...</p>
        ) : reservas.length === 0 ? (
          <p>Nenhuma reserva encontrada.</p>
        ) : (
          <div className="rooms-grid">
            {reservas.map((r) => (
              <ReservationCard
                key={r.id}
                sala={r.salaNome || r.sala?.nome || r.sala}
                data={r.data}
                horario={
                  r.horario || `${r.horaInicio || ""} - ${r.horaFim || ""}`
                }
                status={r.status}
                imagem={r.sala?.imagem || r.imagem}
                onClick={() => console.log("Reserva clicada", r)}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default MinhasReservas;
