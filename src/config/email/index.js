require('dotenv').config();
const nodemailer = require('./nodemailer')
const drivers = require('../../scripts/utils/emailDrivers');

module.exports = {
    transport: nodemailer,
    driver: drivers.NODEMAILER
}

