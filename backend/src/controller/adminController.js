const adminModel = require('../models/adminModel');

async function createAdmin(req, res) {
  try {
    const data = req.body;
    if (!data.email || !data.senha) return res.status(400).json({ error: 'email e senha obrigatórios' });
    const exists = await adminModel.findAdminByEmail(data.email);
    if (exists) return res.status(400).json({ error: 'email admin já cadastrado' });

    const adm = await adminModel.createAdmin(data);
    res.status(201).json(adm);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

async function getAdmin(req, res) {
  try {
    const { id } = req.params;
    const adm = await adminModel.getAdminById(id);
    if (!adm) return res.status(404).json({ error: 'admin não encontrado' });
    res.json(adm);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

module.exports = { createAdmin, getAdmin };
