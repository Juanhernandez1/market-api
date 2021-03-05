const { Sequelize, Op } = require("sequelize");
const ConnectionDb = require("../../../../config/databases/postgreSql");
const ConfiguracionDb = require("../../../../config/databases/ConfiguracionDb");
const { initModels } = require("../../../../models/sequelize");
const ControllerDb = require("./src/Controller");

const Connection = new ConnectionDb(Sequelize, ConfiguracionDb);

const { conexion } = Connection;

const { categories, detailorders, orders, products, trademarks } = initModels(conexion);

const CRUD_DB = {
  Categories: new ControllerDb(categories, Op),
  Detailorders: new ControllerDb(detailorders, Op),
  Orders: new ControllerDb(orders, Op),
  Products: new ControllerDb(products, Op),
  Trademarks: new ControllerDb(trademarks, Op)
};

module.exports = CRUD_DB;
