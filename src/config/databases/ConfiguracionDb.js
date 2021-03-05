const { config } = require("dotenv");
config();

const ConfiguracionDb = {
  url: process.env.DATABASE_URL === undefined ? process.env.DATABASE_URL : null,
  configuracionCnUrl: {
    dialect: "postgres",
    protocol: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
    }
  },
  nombreDb: process.env.DB_DATABASE,
  usuarioDb: process.env.DB_USER,
  claveDb: process.env.DB_PASS,
  configuracionCnlocal: {
    dialect: process.env.DB_DIALECT,
    protocol: process.env.DB_PROTOCOL,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST
  }
};

module.exports = ConfiguracionDb;
