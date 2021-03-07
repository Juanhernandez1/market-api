const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return trademarks.init(sequelize, DataTypes);
}

class trademarks extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_trademark: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name_trademark: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    delete_timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'trademarks',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "trademarks_pkey",
        unique: true,
        fields: [
          { name: "id_trademark" },
        ]
      },
    ]
  });
  return trademarks;
  }
}
