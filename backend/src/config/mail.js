require("dotenv").config();
const nodemailer = require("nodemailer");

const mailOptions = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(mailOptions);

module.exports = transporter;
