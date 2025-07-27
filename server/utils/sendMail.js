const nodemailer = require("nodemailer");

const sendMail = async ({ to, subject, text, attachments }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, // Use the app password
    },
  });

  const info = await transporter.sendMail({
    from: `"Smart Study Scheduler" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Your Smart Study Schedule!",
    text,
    attachments,
  });
};

module.exports = sendMail;
