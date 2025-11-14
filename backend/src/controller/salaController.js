const salaModel = require('../models/salaModel');

async function createSala(req, res) {
  try {
    const data = req.body;
    if (!data.nome || !data.capacidade) return res.status(400).json({ error: 'nome e capacidade obrigatórios' });
    const sala = await salaModel.createSala(data);
    res.status(201).json(sala);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

async function listSalas(req, res) {
  try {
    const salas = await salaModel.listSalas();
    res.json(salas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

async function getSala(req, res) {
  try {
    const { id } = req.params;
    const sala = await salaModel.getSalaById(id);
    if (!sala) return res.status(404).json({ error: 'sala não encontrada' });
    res.json(sala);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

async function updateSala(req, res) {
  try {
    const { id } = req.params;
    const updated = await salaModel.updateSala(id, req.body);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

async function deleteSala(req, res) {
  try {
    const { id } = req.params;
    await salaModel.deleteSala(id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

module.exports = { createSala, listSalas, getSala, updateSala, deleteSala };
