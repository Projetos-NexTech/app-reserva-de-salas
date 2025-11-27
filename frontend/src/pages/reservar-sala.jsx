import { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Calendar from "react-calendar";
import SideBar from "../components/SideBar";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

function ReservarSala() {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
            tileDisabled={({ date }) => {
              const d = new Date(date);
              d.setHours(0, 0, 0, 0);
              return d < today || date.getDay() === 0 || date.getDay() === 6;
            }}
          />
          <TimePicker onChange={setStart} value={start} />
          <TimePicker onChange={setEnd} value={end} />
        </div>
        <SideBar
          pinacoteca="Pinacoteca de São Paulo"
          title="Auditório 1"
          date="23 de novembro"
          hour="10:00 - 14:00"
        />
      </main>
      <Footer />
    </div>
  );
}

export default ReservarSala;
