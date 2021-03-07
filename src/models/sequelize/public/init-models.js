var DataTypes = require("sequelize").DataTypes;
var _categories = require("./categories");
var _detail_orders = require("./detail_orders");
var _orders = require("./orders");
var _products = require("./products");
var _trademarks = require("./trademarks");

function initModels(sequelize) {
  var categories = _categories(sequelize, DataTypes);
  var detail_orders = _detail_orders(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var trademarks = _trademarks(sequelize, DataTypes);

  products.belongsTo(categories, { as: "id_category_category", foreignKey: "id_category"});
  categories.hasMany(products, { as: "products", foreignKey: "id_category"});
  detail_orders.belongsTo(orders, { as: "id_order_order", foreignKey: "id_order"});
  orders.hasMany(detail_orders, { as: "detail_orders", foreignKey: "id_order"});
  detail_orders.belongsTo(products, { as: "id_product_product", foreignKey: "id_product"});
  products.hasMany(detail_orders, { as: "detail_orders", foreignKey: "id_product"});
  products.belongsTo(trademarks, { as: "id_trademark_trademark", foreignKey: "id_trademark"});
  trademarks.hasMany(products, { as: "products", foreignKey: "id_trademark"});

  return {
    categories,
    detail_orders,
    orders,
    products,
    trademarks,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
