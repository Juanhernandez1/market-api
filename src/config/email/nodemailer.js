require('dotenv').config();
const nodemailer = require("nodemailer");
const sparkPostTransport = require('nodemailer-sparkpost-transport');

if (process.env.NODE_ENV === 'dev') {
    let transport = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
            user: process.env.MAILTRAP_USER, // generated ethereal user
            pass: process.env.MAILTRAP_PSW, // generated ethereal password
        }
    });

    module.exports = transport;
} else {
    let transport = nodemailer.createTransport(sparkPostTransport({sparkPostApiKey: process.env.ASPARKPOST_API_KEY}));
    module.exports = transport;
}


