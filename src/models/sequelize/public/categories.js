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
    // * llave primaria
    const llavepk = this.primaryKeyAttributes[0];
    // * Estado del registro
    const campoE = this.fieldAttributeMap.tipo;
    // * objetos para comparacion
    const Mapobjeto1 = { ...this.fieldAttributeMap };
    const Mapobjeto2 = { ...this.fieldAttributeMap };
    // * Eliminados Campos
    Object.keys(Mapobjeto1).forEach(key => {
      if (Mapobjeto1[key] === "Estado" || Mapobjeto1[key] === llavepk || key.search("uid") === 0) {
        delete Mapobjeto1[key];
      }
    });
    // * lista de campos que permitiran busqueda por like
    const whereLike = Object.values(Mapobjeto1);
    // * Eliminando Campos
    Object.keys(Mapobjeto2).forEach(key => {
      if (key.search("uid") !== 0) {
        delete Mapobjeto2[key];
      }
    });
    // * lista de campos que permiten consultas and
    const whereAND = Object.values(Mapobjeto2);
    // * lista de tablas relacionadas
    const asocicion = Object.values(this.associations);

    return {
      campoPk: llavepk,
      asocicion,
      condicion: {
        WhereLike: whereLike,
        WhereStado: { campoE },
        Where: whereAND
      },
      vista: null
    };
  }
}
