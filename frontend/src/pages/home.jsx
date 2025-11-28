import React, { useEffect, useState, useContext } from "react";
import NavBar from "../components/NavBar";
import RoomCard from "../components/RoomCard";
import Footer from "../components/Footer";
import rightarrow from "../assets/icons/right-arrow.svg";
import { useNavigate } from "react-router-dom";
import { listRooms } from "../services/salaService";
import { getAdminById } from "../services/adminService";
import { AuthContext } from "../context/AuthContext";
import Dashboard from "../components/Dashboard";

function Home() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useContext(AuthContext);

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
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    async function checkAdmin() {
      try {
        const currentUserId = user?.id || JSON.parse(localStorage.getItem("user") || "null")?.id || localStorage.getItem("usuarioId") || localStorage.getItem("userId");
        if (!currentUserId) {
          if (mounted) setIsAdmin(false);
          return;
        }
        const admin = await getAdminById(currentUserId);
        if (mounted) setIsAdmin(!!(admin && admin.id));
      } catch (err) {
        if (mounted) setIsAdmin(false);
      }
    }
    checkAdmin();
    return () => { mounted = false; };
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
        <Dashboard />
        <section>
          <div className="section-title-group">
            <h1 className="white-title">Minhas Reservas</h1>

            <button className="btn-primary toRightTransition white">
              Confira suas reservas
              <img className="arrow" src={rightarrow} alt="" />
            </button>
          </div>

          {loading && <p>Carregando salas...</p>}
          {error && <p className="error">{error}</p>}

          <div className="rooms-group">
            
          </div>
        </section>

        <section>
          <div className="section-title-group">
            <h1 className="white-title">Salas disponíveis</h1>
            <button className="btn-primary toRightTransition white">
              Confira todas as salas disponíveis
              <img className="arrow" src={rightarrow} alt="" />
            </button>
          </div>

          <div className="rooms-group">
            {availableRooms.length === 0 && <p>Nenhuma sala disponível no momento.</p>}
            {availableRooms.map((room) => (
              <RoomCard
                key={room.id + "-available"}
                title={room.nome}
                area={`Tamanho: ${formatTamanho(room.tamanho)}`}
                capacity={`Capacidade: ${formatCapacidade(room.capacidade)}`}
                image={room.image || `https://picsum.photos/seed/${room.id}/400/250`}
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
