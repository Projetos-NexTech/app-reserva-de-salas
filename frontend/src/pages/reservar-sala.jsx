import { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Calendar from "react-calendar";
import SideBar from "../components/SideBar";

function ReservarSala() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTimes, setShowTimes] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);
  const [startHour, setStartHour] = useState(null);
  const [endHour, setEndHour] = useState(null);

  const [selectingHour, setSelectingHour] = useState("start");



  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const horariosDisponiveis = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  const handleDayClick = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    if (d < today || d.getDay() === 0 || d.getDay() === 6) {
      return;
    }

    setSelectedDate(date);
    setShowTimes(true);
  };

  const location = useLocation();
  const room = location?.state?.room || null;
  const roomTitle = room?.nome || "Selecione uma sala";

  return (
    <div className="reservar-sala-container">
      <NavBar />
      <section className="first-section">
        <div className="info"></div>
      </section>

      <main>
        <div>
          <Calendar
            calendarType="gregory"
            minDetail="month"
            maxDetail="month"
            prev2Label={null}
            next2Label={null}
            onClickDay={handleDayClick}
            tileDisabled={({ date }) => {
              const d = new Date(date);
              d.setHours(0, 0, 0, 0);
              return d < today || date.getDay() === 0 || date.getDay() === 6;
            }}
          />

          {showTimes && selectedDate && (
            <div style={{ marginTop: 20 }}>
              <h3>Horários para {selectedDate.toLocaleDateString()}</h3>
              <h3>
                {selectingHour === "start"
                  ? "Selecione o horário de INÍCIO:"
                  : "Selecione o horário de FIM:"}
              </h3>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {horariosDisponiveis.map((hora) => (
                  <button
                    key={hora}
                    style={{
                      padding: 10,
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (selectingHour === "start") {
                        setStartHour(hora);
                        setSelectingHour("end");
                        return;
                      }

                      if (selectingHour === "end") {
                        // garantia simples: horário de fim não pode ser antes do início
                        if (startHour && hora <= startHour) {
                          alert("O horário de fim precisa ser após o horário de início.");
                          return;
                        }

                        setEndHour(hora);
                        setSelectingHour("start"); // reinicia para permitir novo agendamento
                      }
                    }
                    }>
                    {hora}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <SideBar
          title={roomTitle}
          date={selectedDate ? selectedDate.toLocaleDateString() : "Selecione um dia"}
          hour={
            startHour && endHour
              ? `${startHour} - ${endHour}`
              : "Selecione horários"
          }

        />
      </main>
      <Footer />
    </div>
  );
}

export default ReservarSala;
