const { db } = require('../config/firebase');
const COLLECTION = process.env.COLLECTION_RESERVA || 'reserva';

async function createReserva(data) {
  const docRef = db.collection(COLLECTION).doc();
  const payload = {
    usuarioId: data.usuarioId,
    salaId: data.salaId,
    dataReserva: data.dataReserva,     // "YYYY-MM-DD"
    horarioInicio: data.horarioInicio, // "HH:MM"
    horarioFim: data.horarioFim,       // "HH:MM"
    status: data.status || 'pending',  // pending, confirmed, cancelled, modified
    createdAt: new Date()
  };
  await docRef.set(payload);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

async function getReservaById(id) {
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

async function listReservas(filter = {}) {
  let query = db.collection(COLLECTION);
  if (filter.salaId) query = query.where('salaId', '==', filter.salaId);
  if (filter.usuarioId) query = query.where('usuarioId', '==', filter.usuarioId);
  if (filter.dataReserva) query = query.where('dataReserva', '==', filter.dataReserva);
  const snapshot = await query.get();
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function updateReserva(id, data) {
  const ref = db.collection(COLLECTION).doc(id);
  await ref.update({ ...data, updatedAt: new Date() });
  const doc = await ref.get();
  return { id: doc.id, ...doc.data() };
}

async function deleteReserva(id) {
  await db.collection(COLLECTION).doc(id).delete();
  return true;
}

module.exports = { createReserva, getReservaById, listReservas, updateReserva, deleteReserva };
