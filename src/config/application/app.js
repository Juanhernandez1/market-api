require('dotenv').config();

module.exports = {
    env:  process.env.NODE_ENV,
    name: process.env.NODE_NAME,
    port: process.env.NODE_PORT || 8000,
    host: process.env.NODE_HOST
}