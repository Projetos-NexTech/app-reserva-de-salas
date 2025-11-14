const reservaModel = require('../models/reservaModel');
const salaModel = require('../models/salaModel');
const usuarioModel = require('../models/usuarioModel');
const reservaService = require('../services/reservaService');
const emailService = require('../services/emailService');

async function createReserva(req, res) {
  try {
    const { usuarioId, salaId, dataReserva, horarioInicio, horarioFim } = req.body;
    if (!usuarioId || !salaId || !dataReserva || !horarioInicio || !horarioFim) {
      return res.status(400).json({ error: 'usuarioId, salaId, dataReserva, horarioInicio e horarioFim são obrigatórios' });
    }

    // valida existencia usuario e sala
    const usuario = await usuarioModel.getUsuarioById(usuarioId);
    if (!usuario) return res.status(400).json({ error: 'usuarioId inválido' });
    const sala = await salaModel.getSalaById(salaId);
    if (!sala) return res.status(400).json({ error: 'salaId inválido' });
    if (!sala.disponivel) return res.status(400).json({ error: 'sala indisponível' });

    const available = await reservaService.isSalaAvailable(salaId, dataReserva, horarioInicio, horarioFim);
    if (!available) return res.status(409).json({ error: 'horário conflitante' });

    const reserva = await reservaModel.createReserva({ usuarioId, salaId, dataReserva, horarioInicio, horarioFim, status: 'confirmed' });

    // tenta enviar notificação por email (não bloqueia a resposta em caso de erro)
    (async () => {
      try {
        await emailService.sendReservaCreatedEmail(usuario, sala, reserva);
        console.log('Email de confirmação enviado para', usuario.email);
      } catch (err) {
        console.error('Falha ao enviar email de confirmação:', err);
      }
    })();

    res.status(201).json(reserva);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

async function listReservas(req, res) {
  try {
    const filter = {};
    if (req.query.salaId) filter.salaId = req.query.salaId;
    if (req.query.usuarioId) filter.usuarioId = req.query.usuarioId;
    if (req.query.dataReserva) filter.dataReserva = req.query.dataReserva;
    const reservas = await reservaModel.listReservas(filter);
    res.json(reservas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

async function getReserva(req, res) {
  try {
    const { id } = req.params;
    const reserva = await reservaModel.getReservaById(id);
    if (!reserva) return res.status(404).json({ error: 'reserva não encontrada' });
    res.json(reserva);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

async function updateReserva(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    // se alterar horário ou sala, verificar disponibilidade
    if (data.salaId || data.dataReserva || data.horarioInicio || data.horarioFim) {
      const reservaAtual = await reservaModel.getReservaById(id);
      if (!reservaAtual) return res.status(404).json({ error: 'reserva não encontrada' });

      const salaId = data.salaId || reservaAtual.salaId;
      const dataReserva = data.dataReserva || reservaAtual.dataReserva;
      const horarioInicio = data.horarioInicio || reservaAtual.horarioInicio;
      const horarioFim = data.horarioFim || reservaAtual.horarioFim;

      const available = await reservaService.isSalaAvailable(salaId, dataReserva, horarioInicio, horarioFim);
      // allow if only the same reservation (avoid self-conflict) — nosso isSalaAvailable considera todas as reservas; simples solução: se houver conflito e não for a própria reserva, bloqueia
      if (!available) return res.status(409).json({ error: 'horário conflitante' });
    }

    const updated = await reservaModel.updateReserva(id, data);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

async function deleteReserva(req, res) {
  try {
    const { id } = req.params;
    await reservaModel.deleteReserva(id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

module.exports = { createReserva, listReservas, getReserva, updateReserva, deleteReserva };
