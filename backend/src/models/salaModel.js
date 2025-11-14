const { db } = require('../config/firebase');
const COLLECTION = process.env.COLLECTION_SALA || 'sala';

async function createSala(data) {
  const docRef = db.collection(COLLECTION).doc();
  const payload = {
    nome: data.nome,
    capacidade: data.capacidade,
    descricao: data.descricao || '',
    recursos: data.recursos || [],
    disponivel: data.disponivel !== undefined ? data.disponivel : true,
    createdAt: new Date()
  };
  await docRef.set(payload);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

async function getSalaById(id) {
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

async function listSalas() {
  const snapshot = await db.collection(COLLECTION).get();
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function updateSala(id, data) {
  const ref = db.collection(COLLECTION).doc(id);
  await ref.update({ ...data, updatedAt: new Date() });
  const doc = await ref.get();
  return { id: doc.id, ...doc.data() };
}

async function deleteSala(id) {
  await db.collection(COLLECTION).doc(id).delete();
  return true;
}

module.exports = { createSala, getSalaById, listSalas, updateSala, deleteSala };
