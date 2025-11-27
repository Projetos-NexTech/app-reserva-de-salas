const adminModel = require('../models/adminModel');
const emailService = require('../services/emailService');
const bcrypt = require('bcryptjs');

async function createAdmin(req, res) {
  try {
    const data = req.body;
    if (!data.email || !data.senha) return res.status(400).json({ error: 'email e senha obrigatórios' });
    const exists = await adminModel.findAdminByEmail(data.email);
    if (exists) return res.status(400).json({ error: 'email admin já cadastrado' });
    // hash da senha antes de salvar
    const hashed = await bcrypt.hash(data.senha, 10);
    data.senha = hashed;

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

async function loginAdmin(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ error: 'email e senha são obrigatórios' });
    }
    const admin = await adminModel.findAdminByEmail(email);
    if (!admin) return res.status(401).json({ error: 'email ou senha inválidos' });
    const match = await bcrypt.compare(senha, admin.senha);
    if (!match) return res.status(401).json({ error: 'email ou senha inválidos' });
    res.json({ success: true, admin: { id: admin.id, email: admin.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

async function requestPasswordReset(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'email é obrigatório' });

    const adm = await adminModel.findAdminByEmail(email);
    const name = adm ? '' : '';

    try {
      await emailService.sendPasswordResetEmail(email, name);
      return res.json({ success: true });
    } catch (err) {
      console.error('Erro ao gerar/enviar link de reset admin:', err);
      return res.status(400).json({ error: 'não foi possível gerar link de redefinição (verifique se o email existe no Firebase Auth)' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

module.exports = { createAdmin, getAdmin, loginAdmin, requestPasswordReset };
