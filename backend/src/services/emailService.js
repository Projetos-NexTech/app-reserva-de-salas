const nodemailer = require('nodemailer');

// Configurações via variáveis de ambiente:
// SMTP_HOST, SMTP_PORT, SMTP_SECURE ("true"/"false"), SMTP_USER, SMTP_PASS, EMAIL_FROM
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

  const to = usuario.email;
  const subject = `Reserva confirmada: ${sala && sala.nome ? sala.nome : 'Sala'} - ${reserva.dataReserva}`;

  const text = `Olá ${usuario.nome || ''},

Sua reserva foi confirmada com os seguintes dados:

Sala: ${sala && sala.nome ? sala.nome : reserva.salaId}
Data: ${reserva.dataReserva}
Horário: ${reserva.horarioInicio} - ${reserva.horarioFim}

Status: ${reserva.status}

Caso precise alterar ou cancelar, acesse o sistema.

Atenciosamente,
Equipe de Reservas`;

  const html = `<p>Olá ${usuario.nome || ''},</p>
<p>Sua reserva foi confirmada com os seguintes dados:</p>
<ul>
  <li><strong>Sala:</strong> ${sala && sala.nome ? sala.nome : reserva.salaId}</li>
  <li><strong>Data:</strong> ${reserva.dataReserva}</li>
  <li><strong>Horário:</strong> ${reserva.horarioInicio} - ${reserva.horarioFim}</li>
  <li><strong>Status:</strong> ${reserva.status}</li>
</ul>
<p>Caso precise alterar ou cancelar, acesse o sistema.</p>
<p>Atenciosamente,<br/>Equipe de Reservas</p>`;

  const mailOptions = {
    from: FROM,
    to,
    subject,
    text,
    html,
  };

  // retorna a promise do nodemailer
  return transporter.sendMail(mailOptions);
}

module.exports = { sendReservaCreatedEmail };
