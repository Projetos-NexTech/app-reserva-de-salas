import React from "react";
import Calendar from "react-calendar";

function Home() {
  return (
    <div>
      <Calendar
        tileDisabled={({ date }) =>
          date < new Date() || date.getDay() === 0 || date.getDay() === 6
        }
      />
    </div>
  );
}
export default Home;
