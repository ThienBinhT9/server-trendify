const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const transporterMail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ADMIN,
    pass: process.env.APP_PASSWROD,
  },
});

module.exports = { transporterMail };
