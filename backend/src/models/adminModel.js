const { db } = require('../config/firebase');
const COLLECTION = process.env.COLLECTION_ADMIN || 'admin';

async function createAdmin(data) {
  const docRef = db.collection(COLLECTION).doc();
  const payload = { email: data.email, senha: data.senha, createdAt: new Date() };
  await docRef.set(payload);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

async function getAdminById(id) {
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

async function findAdminByEmail(email) {
  const snapshot = await db.collection(COLLECTION).where('email', '==', email).limit(1).get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
}

module.exports = { createAdmin, getAdminById, findAdminByEmail };
