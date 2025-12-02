import React, { useEffect, useState, useContext } from "react";
import NavBar from "../components/NavBar";
import RoomCard from "../components/RoomCard";
import Footer from "../components/Footer";
import rightarrow from "../assets/icons/right-arrow.svg";
import { useNavigate } from "react-router-dom";
import { listRooms } from "../services/salaService";
import { listReservationsByUser } from "../services/reservaService";
import { getAdminById } from "../services/adminService";
import { AuthContext } from "../context/AuthContext";
import Dashboard from "../components/Dashboard";
import ReservationCard from "../components/ReservationCard";
import "../styles/pages/salas.css"; // reuse grid styles

function Home() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [reservas, setReservas] = useState([]);
  const [loadingReservas, setLoadingReservas] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const itemsPerPage = 3;
  const { user } = useContext(AuthContext);

  function irPara(rota) {
    navigate(rota);
  }

  useEffect(() => {
    let mounted = true;
    async function fetchRooms() {
      try {
        setLoading(true);
        const data = await listRooms();
        if (!mounted) return;
        setRooms(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Erro ao carregar salas");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }
    fetchRooms();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    async function fetchReservas() {
      try {
        setLoadingReservas(true);
        const currentUserId =
          user?.id || JSON.parse(localStorage.getItem("user") || "null")?.id;
        if (!currentUserId) {
          if (mounted) setReservas([]);
          return;
        }
        const data = await listReservationsByUser(currentUserId);
        if (!mounted) return;
        setReservas(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao buscar reservas:", err);
      } finally {
        if (mounted) setLoadingReservas(false);
      }
    }
    fetchReservas();
    return () => {
      mounted = false;
    };
  }, [user]);

  useEffect(() => {
    // Check if user.role is 'admin' from AuthContext
    if (user && user.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const handleOpen = (room) => {
    navigate("/reservar-sala", { state: { room } });
  };
  const availableRooms = rooms.filter((r) => r.disponivel);
  const formatTamanho = (t) => {
    if (t === null || t === undefined || t === "") return "-";
    const s = String(t).trim();
    if (s.toLowerCase().includes("m")) return s;
    return `${s}M²`;
  };

  const formatCapacidade = (c) => {
    if (c === null || c === undefined || c === "") return "-";
    return String(c);
  };

  return (
    <div className="home-container">
      <NavBar />
      <section className="first-section"></section>
      <main>
        <Dashboard isAdmin={isAdmin} />
        <section>
          <div className="section-title-group">
            <h1 className="white-title">Minhas Reservas</h1>

            <button
              className="btn-primary toRightTransition white"
              onClick={() => irPara("/minhas-reservas")}
            >
              Confira suas reservas
              <img className="arrow" src={rightarrow} alt="" />
            </button>
          </div>

          <div className="rooms-grid">
            {reservas
              .slice(
                pageIndex * itemsPerPage,
                pageIndex * itemsPerPage + itemsPerPage
              )
              .map((r) => (
                <ReservationCard
                  key={r.id}
                  sala={r.salaNome || r.sala?.nome || r.sala}
                  data={r.data}
                  horario={
                    r.horario || `${r.horaInicio || ""} - ${r.horaFim || ""}`
                  }
                  status={r.status}
                  imagem={r.sala?.imagem || r.imagem}
                  onClick={() => console.log("Reserva clicada:", r)}
                />
              ))}
          </div>

          {loadingReservas && <p>Carregando reservas...</p>}
          {error && <p className="error">{error}</p>}

          {loadingReservas ? null : reservas.length === 0 ? (
            <p>Você não possui reservas.</p>
          ) : (
            <>
              {reservas.length > itemsPerPage && (
                <div className="slider-controls">
                  <button
                    type="button"
                    className="slider-btn"
                    onClick={() =>
                      setPageIndex(
                        (prev) =>
                          (prev -
                            1 +
                            Math.ceil(reservas.length / itemsPerPage)) %
                          Math.ceil(reservas.length / itemsPerPage)
                      )
                    }
                  >
                    ◀
                  </button>
                  <button
                    type="button"
                    className="slider-btn"
                    onClick={() =>
                      setPageIndex(
                        (prev) =>
                          (prev + 1) % Math.ceil(reservas.length / itemsPerPage)
                      )
                    }
                  >
                    ▶
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <section>
          <div className="section-title-group">
            <h1 className="white-title">Salas disponíveis</h1>
            <button
              className="btn-primary toRightTransition white"
              onClick={() => irPara("/salas")}
            >
              Confira todas as salas disponíveis
              <img className="arrow" src={rightarrow} alt="" />
            </button>
          </div>

          <div className="rooms-group">
            {availableRooms.length === 0 && (
              <p>Nenhuma sala disponível no momento.</p>
            )}
            {availableRooms.map((room) => (
              <RoomCard
                key={room.id + "-available"}
                title={room.nome}
                area={`Tamanho: ${formatTamanho(room.tamanho)}`}
                capacity={`Capacidade: ${formatCapacidade(room.capacidade)}`}
                image={
                  room.image || `https://picsum.photos/seed/${room.id}/400/250`
                }
                onClick={() => handleOpen(room)}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
export default Home;
