const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return detail_orders.init(sequelize, DataTypes);
}

class detail_orders extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_detail: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id_order'
      }
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id_product'
      }
    },
    price_product: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discount_product: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'detail_orders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "detail_orders_pkey",
        unique: true,
        fields: [
          { name: "id_detail" },
        ]
      },
    ]
  });
  return detail_orders;
  }
}
