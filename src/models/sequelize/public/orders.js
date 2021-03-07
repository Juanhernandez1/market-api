const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return orders.init(sequelize, DataTypes);
}

class orders extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_order: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    uid_order: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    uid_supplier: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    uid_client: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    date_order: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_delivery: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    sub_total: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    surcharge: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    state_order: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    delete_timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    update_timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "orders_pkey",
        unique: true,
        fields: [
          { name: "id_order" },
        ]
      },
    ]
  });
  return orders;
  }
}
