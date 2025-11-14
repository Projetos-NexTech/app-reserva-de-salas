require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const salaRoutes = require('./src/routes/salaRoutes');
const reservaRoutes = require('./src/routes/reservaRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Rotas base
app.use('/api/usuario', usuarioRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/sala', salaRoutes);
app.use('/api/reserva', reservaRoutes);

// health
app.get('/', (req, res) => res.send({ ok: true, timestamp: new Date() }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
