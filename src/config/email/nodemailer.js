require('dotenv').config();
const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
        user: process.env.MAILTRAP_USER, // generated ethereal user
        pass: process.env.MAILTRAP_PSW, // generated ethereal password
    }
});

module.exports = transport;


