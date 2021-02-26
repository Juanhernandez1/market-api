require('dotenv').config();

module.exports = {
    env:  process.env.NODE_ENV,
    name: process.env.NODE_NAME,
    port: process.env.NODE_PORT || 3333,
    host: process.env.NODE_HOST
}