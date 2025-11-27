const nodemailer = require('nodemailer');
const { admin } = require('../config/firebase');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true' || false,
  auth: {
    user: process.env.SMTP_USER || undefined,
    pass: process.env.SMTP_PASS || undefined,
  },
});

const FROM = process.env.EMAIL_FROM || 'no-reply@example.com';

async function sendReservaCreatedEmail(usuario, sala, reserva) {
  if (!usuario || !usuario.email) {
    throw new Error('Usuário sem email');
  }
  if (!sala || !sala.nome) {
    throw new Error('Sala sem nome');
  }
  if (!reserva) {
    throw new Error('Reserva não fornecida');
  }

  const to = usuario.email;
  const salaNome = sala.nome || 'Sala desconhecida';
  const dataReserva = reserva.dataReserva || 'Data não especificada';
  const horarioInicio = reserva.horarioInicio || 'Horário não especificado';
  const horarioFim = reserva.horarioFim || 'Horário não especificado';
  const status = reserva.status || 'pendente';

  const subject = `Reserva confirmada: ${salaNome} - ${dataReserva}`;

  const text = `Olá ${usuario.nome || 'Usuário'},

Sua reserva foi confirmada com os seguintes dados:

Sala: ${salaNome}
Data: ${dataReserva}
Horário: ${horarioInicio} - ${horarioFim}
Status: ${status}

Caso precise alterar ou cancelar, acesse o sistema.

Atenciosamente`;

  const html = `<p>Olá ${usuario.nome || 'Usuário'},</p>
<p>Sua reserva foi confirmada com os seguintes dados:</p>
<ul>
  <li><strong>Sala:</strong> ${salaNome}</li>
  <li><strong>Data:</strong> ${dataReserva}</li>
  <li><strong>Horário:</strong> ${horarioInicio} - ${horarioFim}</li>
  <li><strong>Status:</strong> ${status}</li>
</ul>
<p>Caso precise alterar ou cancelar, acesse o sistema.</p>
<p>Atenciosamente</p>`;

  const mailOptions = {
    from: FROM,
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
}

async function sendPasswordResetEmail(email, name = '', tempPassword = null) {
  if (!email) throw new Error('email obrigatório');

  const subject = `Redefinição de senha`;
  let text, html;

  if (tempPassword) {
    // enviar a senha temporária
    text = `Olá ${name || ''},\n\nSua senha temporária é: ${tempPassword}\n\nUse esta senha para fazer login. Você poderá alterar sua senha após entrar no sistema.\n\nSe você não solicitou, ignore este email.`;
    html = `<p>Olá ${name || ''},</p><p>Sua senha temporária é:</p><p><strong style="font-size: 18px; letter-spacing: 2px;">${tempPassword}</strong></p><p>Use esta senha para fazer login. Você poderá alterar sua senha após entrar no sistema.</p><p>Se você não solicitou, ignore este email.</p>`;
  } else {
    // enviar link de reset do Firebase (fallback)
    const actionCodeSettings = {
      url: process.env.PASSWORD_RESET_URL || 'http://localhost:3000/reset-password',
      handleCodeInApp: false,
    };
    const link = await admin.auth().generatePasswordResetLink(email, actionCodeSettings);
    text = `Olá ${name || ''},\n\nPara redefinir sua senha, acesse o link abaixo:\n${link}\n\nSe você não solicitou, ignore este email.`;
    html = `<p>Olá ${name || ''},</p><p>Para redefinir sua senha, clique no link abaixo:</p><p><a href="${link}">${link}</a></p><p>Se você não solicitou, ignore este email.</p>`;
  }

  const mailOptions = {
    from: FROM,
    to: email,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendReservaCreatedEmail, sendPasswordResetEmail };
