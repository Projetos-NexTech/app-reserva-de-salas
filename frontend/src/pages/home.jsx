import React from "react";
import NavBar from "../components/NavBar";
import RoomCard from "../components/RoomCard";
import Footer from "../components/Footer";
import rightarrow from "../assets/icons/right-arrow.svg";

function Home() {
  return (
    <div className="home-container">
      <NavBar />
        <section className="first-section">

        </section>
      <main>
        <section>
          <div className="section-title-group">
            <h1 className="white-title">Minhas Reservas</h1>

            <button className="btn-primary toRightTransition white">
              Confira suas reservas
              <img className="arrow" src={rightarrow} alt="" />
            </button>
          </div>
          <div className="rooms-group">
            <RoomCard
              title="Sala 1"
              area="Área: 20m"
              features={["Capacidade: 10 pessoas", "Projetor", "Wi-Fi"]}
              image="https://picsum.photos/id/237/400/250"
            />
            <RoomCard
              title="Sala 2"
              area="Área: 50m"
              features={["Capacidade: 10 pessoas", "Projetor", "Wi-Fi"]}
              image="https://picsum.photos/id/237/400/250"
            />
            <RoomCard
              title="Sala 3"
              area="Área: 160m"
              features={["Capacidade: 10 pessoas", "Projetor", "Wi-Fi"]}
              image="https://picsum.photos/id/237/400/250"
            />
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
            <RoomCard
              title="Sala 1"
              area="Área: 20m"
              features={["Capacidade: 10 pessoas", "Projetor", "Wi-Fi"]}
              image="https://picsum.photos/id/237/400/250"
            />
            <RoomCard
              title="Sala 2"
              area="Área: 50m"
              features={["Capacidade: 10 pessoas", "Projetor", "Wi-Fi"]}
              image="https://picsum.photos/id/237/400/250"
            />
            <RoomCard
              title="Sala 3"
              area="Área: 160m"
              features={["Capacidade: 10 pessoas", "Projetor", "Wi-Fi"]}
              image="https://picsum.photos/id/237/400/250"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
export default Home;
