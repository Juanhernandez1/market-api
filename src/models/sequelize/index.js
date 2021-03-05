const DataTypes = require("sequelize").DataTypes;
const _categories = require("./public/categories");
const _detailorders = require("./public/detail_orders");
const _orders = require("./public/orders");
const _products = require("./public/products");
const _trademarks = require("./public/trademarks");

function initModels(sequelize) {
  const categories = _categories(sequelize, DataTypes);
  const detailorders = _detailorders(sequelize, DataTypes);
  const orders = _orders(sequelize, DataTypes);
  const products = _products(sequelize, DataTypes);
  const trademarks = _trademarks(sequelize, DataTypes);

  products.belongsTo(categories, { as: "id_category_category", foreignKey: "id_category" });
  categories.hasMany(products, { as: "products", foreignKey: "id_category" });
  detailorders.belongsTo(orders, { as: "id_order_order", foreignKey: "id_order" });
  orders.hasMany(detailorders, { as: "detail_orders", foreignKey: "id_order" });
  detailorders.belongsTo(products, { as: "id_product_product", foreignKey: "id_product" });
  products.hasMany(detailorders, { as: "detail_orders", foreignKey: "id_product" });
  products.belongsTo(trademarks, { as: "id_trademark_trademark", foreignKey: "id_trademark" });
  trademarks.hasMany(products, { as: "products", foreignKey: "id_trademark" });

  return {
    categories,
    detailorders,
    orders,
    products,
    trademarks
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
