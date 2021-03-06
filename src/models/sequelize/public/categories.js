const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return categories.init(sequelize, DataTypes);
};

class categories extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id_category: {
          autoIncrement: true,
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true
        },
        name_category: {
          type: DataTypes.STRING(255),
          allowNull: false
        },
        delete_timestamp: {
          type: DataTypes.DATE,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: "categories",
        schema: "public",
        createdAt: false,
        updatedAt: false,
        deletedAt: "delete_timestamp",
        indexes: [
          {
            name: "categories_pkey",
            unique: true,
            fields: [{ name: "id_category" }]
          }
        ]
      }
    );
    return categories;
  }

  static Setting() {
    return {
      ConfigFindAll: (Op, param) => {
        console.log(param === "ShowHidden");
        return {
          raw: true,
          nest: true,
          where: {
            delete_timestamp: param === "ShowHidden" ? { [Op.not]: null } : { [Op.is]: null }
          }
        };
      },

      ConfigFindAllView: null,
      whereLike: ["name_category"],
      FieldPk: this.primaryKeyAttributes[0]
    };
  }
}
