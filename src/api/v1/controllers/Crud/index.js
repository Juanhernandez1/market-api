const CRUD_DB = require("./CRUD_DB");
const CRUD_DB_RUTES = require("./CRUD_DB_RUTES");

function CURD(router) {
  const { Categories, Detailorders, Orders, Products, Trademarks } = CRUD_DB;

  CRUD_DB_RUTES(router, "Categories", Categories);
}

module.exports = CURD;
