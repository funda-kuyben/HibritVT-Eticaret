const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Gmail SMTP sunucusu
    port: 587, // TLS portu
    secure: false, // TLS kullan
    auth: {
      user: process.env.EMAIL_USER, // Gmail adresin
      pass: process.env.EMAIL_PASS, // Gmail uygulama şifren
    },
  });

  const mailOptions = {
    from: `E-Ticaret <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
