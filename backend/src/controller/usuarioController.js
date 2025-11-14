const usuarioModel = require('../models/usuarioModel');

async function createUsuario(req, res) {
  try {
    const data = req.body;
    if (!data.nome || !data.email || !data.senha) {
      return res.status(400).json({ error: 'nome, email e senha são obrigatórios' });
    }
    const exists = await usuarioModel.findUsuarioByEmail(data.email);
    if (exists) return res.status(400).json({ error: 'email já cadastrado' });

    const user = await usuarioModel.createUsuario(data);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

async function getUsuario(req, res) {
  try {
    const { id } = req.params;
    const user = await usuarioModel.getUsuarioById(id);
    if (!user) return res.status(404).json({ error: 'usuario não encontrado' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

async function listUsuarios(req, res) {
  try {
    const users = await usuarioModel.listUsuarios();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

module.exports = { createUsuario, getUsuario, listUsuarios };
