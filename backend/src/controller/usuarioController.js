const usuarioModel = require('../models/usuarioModel');
const emailService = require('../services/emailService');
const firebaseSyncService = require('../services/firebaseSyncService');
const bcrypt = require('bcryptjs');

async function hashSenha(senha) {
  return await bcrypt.hash(senha, 10);
}

// Função para gerar senha temporária aleatória
function generateTempPassword() {
  const length = 12;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

async function createUsuario(req, res) {
  try {
    const data = req.body;
    if (!data.nome || !data.email || !data.senha) {
      return res.status(400).json({ error: 'nome, email e senha são obrigatórios' });
    }
    const exists = await usuarioModel.findUsuarioByEmail(data.email);
    if (exists) return res.status(400).json({ error: 'email já cadastrado' });
    data.senha = await hashSenha(data.senha);

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

async function deleteUsuario(req, res) {
  try {
    const { id } = req.params;
    await usuarioModel.deleteUsuario(id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

async function loginUsuario(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ error: 'email e senha são obrigatórios' });
    }
    const user = await usuarioModel.findUsuarioByEmail(email);
    if (!user) return res.status(401).json({ error: 'emailinválidos' });
    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return res.status(401).json({ error: ' senha inválidos' });
    res.json({ success: true, user: { id: user.id, nome: user.nome, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

async function updateUsuario(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await usuarioModel.getUsuarioById(id);
    if (!user) return res.status(404).json({ error: 'usuario não encontrado' });

    // se senha está sendo alterada, fazer hash
    if (data.senha) {
      if (data.senha.length < 6) {
        return res.status(400).json({ error: 'senha deve ter no mínimo 6 caracteres' });
      }
      data.senha = await hashSenha(data.senha);
    }

    const updated = await usuarioModel.updateUsuario(id, data);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

async function requestPasswordReset(req, res) {
  try {
    const { email, novaSenha } = req.body;
    if (!email) return res.status(400).json({ error: 'email é obrigatório' });

    const user = await usuarioModel.findUsuarioByEmail(email);
    if (!user) return res.status(404).json({ error: 'usuario não encontrado' });

    // gerar senha temporária, fazer hash e salvar no banco
    const tempPassword = generateTempPassword();
    const senhaHash = await hashSenha(tempPassword);
    await usuarioModel.updateUsuario(user.id, { senha: senhaHash });

    // enviar email com senha temporária
    try {
      await emailService.sendPasswordResetEmail(email, user.nome, tempPassword);
      return res.json({ success: true, message: 'senha temporária enviada por email' });
    } catch (err) {
      console.error('Erro ao enviar email de reset:', err);
      return res.status(400).json({ error: 'não foi possível enviar email de redefinição' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

async function syncUsuariosToAuth(req, res) {
  try {
    const sendResetEmail = req.body && req.body.sendResetEmail === true;
    const report = await firebaseSyncService.syncUsuariosToAuth({ sendResetEmail });
    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro interno' });
  }
}

module.exports = { createUsuario, getUsuario, listUsuarios, deleteUsuario, loginUsuario, updateUsuario, requestPasswordReset, syncUsuariosToAuth };
