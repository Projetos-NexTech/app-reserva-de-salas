import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import RoomCard from "../components/RoomCard";
import { listRooms } from "../services/salaService";
import "../styles/pages/salas.css";

function Salas() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await listRooms();
        setRooms(data);
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div>
      <NavBar />
      <main>
        <h1>Salas Disponíveis</h1>
        {loading ? (
          <p>Carregando salas...</p>
        ) : (
          <div className="rooms-grid">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                title={room.nome}
                area={`${room.area} m²`}
                capacity={`${room.capacidade} pessoas`}
                image={room.imagem || "https://via.placeholder.com/400x300"}
                onClick={() => console.log("Sala clicada:", room)}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Salas;
