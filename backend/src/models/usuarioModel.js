const { db } = require('../config/firebase');
const COLLECTION = process.env.COLLECTION_USUARIO || 'usuario';

async function createUsuario(data) {
    const docRef = db.collection(COLLECTION).doc();
    const payload = { nome: data.nome, email: data.email, senha: data.senha, createdAt: new Date() };
    await docRef.set(payload);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
}

async function getUsuarioById(id) {
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
}

async function findUsuarioByEmail(email) {
    const snapshot = await db.collection(COLLECTION).where('email', '==', email).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
}

async function listUsuarios() {
    const snapshot = await db.collection(COLLECTION).get();
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function deleteUsuario(id) {
    await db.collection(COLLECTION).doc(id).delete();
    return true;
}

async function updateUsuario(id, data) {
    const ref = db.collection(COLLECTION).doc(id);
    await ref.update({ ...data, updatedAt: new Date() });
    const doc = await ref.get();
    return { id: doc.id, ...doc.data() };
}

module.exports = { createUsuario, getUsuarioById, findUsuarioByEmail, listUsuarios, deleteUsuario, updateUsuario };
