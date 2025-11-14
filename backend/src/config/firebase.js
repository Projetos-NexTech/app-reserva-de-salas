const admin = require("firebase-admin");
const serviceAccount = require("./reserva-app-2c3ba-firebase-adminsdk-fbsvc-e7f018eb3c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const db = admin.firestore();

module.exports = { admin, db };
