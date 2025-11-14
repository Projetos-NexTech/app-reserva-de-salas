const reservaModel = require('../models/reservaModel');

function timeToMinutes(t) {
  // espera "HH:MM"
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

// verifica se dois intervalos [aStart,aEnd] e [bStart,bEnd] se sobrepõem
function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

async function isSalaAvailable(salaId, dataReserva, horarioInicio, horarioFim) {
  // pega reservas existentes para a sala na data
  const reservas = await reservaModel.listReservas({ salaId, dataReserva });
  const newStart = timeToMinutes(horarioInicio);
  const newEnd = timeToMinutes(horarioFim);

  for (const r of reservas) {
    const existStart = timeToMinutes(r.horarioInicio);
    const existEnd = timeToMinutes(r.horarioFim);
    if (overlaps(newStart, newEnd, existStart, existEnd) && r.status !== 'cancelled') {
      return false;
    }
  }
  return true;
}

module.exports = { isSalaAvailable };
