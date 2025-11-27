const usuarioModel = require('../models/usuarioModel');
const { admin } = require('../config/firebase');
const emailService = require('./emailService');

async function syncUsuariosToAuth({ sendResetEmail = false } = {}) {
  const users = await usuarioModel.listUsuarios();
  const report = { created: 0, existing: 0, failed: 0, createdEmails: [], failedEmails: [] };

  for (const u of users) {
    const email = u.email;
    if (!email) {
      report.failed++;
      report.failedEmails.push({ email: null, reason: 'sem email' });
      continue;
    }

    try {
      // verifica se já existe no Firebase Auth
      const existing = await admin.auth().getUserByEmail(email).catch(() => null);
      if (existing) {
        report.existing++;
        continue;
      }

      // cria usuário no Firebase Auth sem definir senha (usuário deverá definir via link de reset)
      const created = await admin.auth().createUser({
        email,
        emailVerified: false,
        displayName: u.nome || undefined,
      });

      if (sendResetEmail) {
        try {
          await emailService.sendPasswordResetEmail(email, u.nome || '');
        } catch (err) {
          report.failed++;
          report.failedEmails.push({ email, reason: 'criado mas falhou ao enviar email' });
          continue;
        }
      }

      report.created++;
      report.createdEmails.push(email);
    } catch (err) {
      report.failed++;
      report.failedEmails.push({ email, reason: String(err) });
    }
  }

  return report;
}

module.exports = { syncUsuariosToAuth };
