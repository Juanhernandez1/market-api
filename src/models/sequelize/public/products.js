const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return products.init(sequelize, DataTypes);
}

class products extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_product: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    uid_product: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "products_uid_product_key"
    },
    barcode_product: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    img_product: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name_product: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description_product: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    id_trademark: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trademarks',
        key: 'id_trademark'
      }
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id_category'
      }
    },
    price_product: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    min_purchase: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discount_product: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    state_product: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    uid_supplier: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    delete_timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'products',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "products_pkey",
        unique: true,
        fields: [
          { name: "id_product" },
        ]
      },
      {
        name: "products_uid_product_key",
        unique: true,
        fields: [
          { name: "uid_product" },
        ]
      },
    ]
  });
  return products;
  }
}
