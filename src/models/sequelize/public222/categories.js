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
        delete_timetamp: {
          type: DataTypes.DATE,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: "categories",
        schema: "public",
        timestamps: false,
        paranoid: true,
        deletedAt: "delete_timetamp",
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
    // * objetos para comparacion
    const Mapobjeto1 = { ...this.fieldAttributeMap };

    // * Eliminados Campos
    Object.keys(Mapobjeto1).forEach(key => {
      if (
        Mapobjeto1[key] === "Estado" ||
        Mapobjeto1[key] === this.primaryKeyAttributes[0] ||
        key.search("uid") === 0
      ) {
        delete Mapobjeto1[key];
      }
    });
    // * lista de campos que permitiran busqueda por like
    const whereLike = Object.values(Mapobjeto1);
    return {
      ConfigFindAll: (Op, param) => {
        let objconfig;
        if (param === "ShowHidden") {
          objconfig = { delete_timetamp: { [Op.not]: null } };
        } else {
          objconfig = { delete_timetamp: { [Op.is]: null } };
        }
        return {
          raw: true,
          nest: true,
          where: { ...objconfig }
        };
      },

      ConfigFindAllView: null,
      whereLike,
      FieldPk: this.primaryKeyAttributes[0]
    };
  }
}
