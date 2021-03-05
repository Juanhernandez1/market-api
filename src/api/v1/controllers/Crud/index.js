const CRUD_DB = require("./CRUD_DB");
const CRUD_DB_RUTES = require("./CRUD_DB_RUTES");

function CURD(router) {
  const { Categories, Detailorders, Orders, Products, Trademarks } = CRUD_DB;

  CRUD_DB_RUTES(router, "Categories", Categories);
  CRUD_DB_RUTES(router, "Detailorders", Detailorders);
  CRUD_DB_RUTES(router, "Orders", Orders);
  CRUD_DB_RUTES(router, "Products", Products);
  CRUD_DB_RUTES(router, "Trademarks", Trademarks);
}

module.exports = CURD;
