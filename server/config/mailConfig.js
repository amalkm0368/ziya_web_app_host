require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // your Gmail
    pass: process.env.EMAIL_PASS   // Gmail App Password (16 chars)
  }
});

// Verify transporter
transporter.verify((err) => {
  if (err) console.error('Mail transporter error:', err);
  else console.log('Mail transporter is ready');
});

module.exports = transporter;
