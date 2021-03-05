const ErrorMessage = require("./ErrorMessage");
const ChangeStatus = require("./ChangeStatus");
const ConditionsOr = require("./ConditionsOr");
const ValidateData = require("./ValidateData");
const View = require("./View");

class Controller {
  constructor(ObjectModel, Op) {
    this.ObjectModel = ObjectModel;
    this.Operations = Op;
  }

  GetAll = async (req, res) => {
    const { ER500, ERDB404 } = ErrorMessage;

    const { condicion, include } = this.ObjectModel.Setting();

    const { WhereStado } = condicion;
    const { campoE, valor } = WhereStado;

    try {
      const obj = ChangeStatus(req.params, campoE, valor, include);

      const data = await this.ObjectModel.findAll(obj);

      ValidateData(data, res, 200, ERDB404);
    } catch (error) {
      res.status(500).send(ER500);
    }
  };

  GetViewAll = async (req, res) => {
    const { ER500, ERDB404 } = ErrorMessage;

    const { condicion, include } = this.ObjectModel.Setting();

    const { WhereStado, Where } = condicion;
    const { campoE, valor } = WhereStado;

    try {
      const obj = ChangeStatus(req.params, campoE, valor, include);

      const data = await this.ObjectModel.findAll(obj);

      const ObjetoView = View(data, Where, include);

      ValidateData(ObjetoView, res, 200, ERDB404);
    } catch (error) {
      res.status(500).send(ER500);
    }
  };

  SearchPk = async (req, res) => {
    const { ER500, ERDB02 } = ErrorMessage;
    try {
      const { id } = req.params;

      const data = await this.ObjectModel.findByPk(id);

      ValidateData(data, res, 200, ERDB02);
    } catch (error) {
      res.status(500).send(ER500);
    }
  };

  SearchOne = async (req, res) => {
    const { ER500, ERDB404LIKE } = ErrorMessage;

    const { condicion } = this.ObjectModel.Setting();

    const { WhereLike, WhereStado } = condicion;
    const { campoE, valor } = WhereStado;

    try {
      const { dato } = req.params;

      const busqueda = ConditionsOr(WhereLike, dato, this.Operaciones);

      const data = await this.ObjectModel.findOne({
        where: { [this.Operaciones.or]: busqueda, [campoE]: valor }
      });

      ValidateData(data, res, 200, ERDB404LIKE);
    } catch (error) {
      res.status(500).send(ER500);
    }
  };

  SearchMany = async (req, res) => {
    const { ER500, ERDB404LIKE } = ErrorMessage;

    const { condicion } = this.ObjectModel.Setting();

    const { WhereLike, WhereStado } = condicion;
    const { campoE, valor } = WhereStado;

    try {
      const { dato } = req.params;

      const busqueda = ConditionsOr(WhereLike, dato, this.Operaciones);

      const data = await this.ObjectModel.findAll({
        where: { [this.Operaciones.or]: busqueda, [campoE]: valor }
      });

      ValidateData(data, res, 200, ERDB404LIKE);
    } catch (error) {
      res.status(500).send(ER500);
    }
  };

  Create = async (req, res) => {
    const { ER500, ERDB01, ERDB404 } = ErrorMessage;
    try {
      const objBody = req.body;

      const data = await this.ObjectModel.create(objBody);

      ValidateData(data.dataValues, res, 200, ERDB404);
    } catch (e) {
      if (e.parent.code === "23505") {
        res.status(406).send(ERDB01);
      } else {
        res.status(500).send(ER500);
      }
    }
  };

  Update = async (req, res) => {
    const { ERDB02, ERDB404 } = ErrorMessage;

    const { campoPk } = this.ObjectModel.Setting();

    try {
      const id = req.body[campoPk];
      delete req.body[campoPk];

      const data = await this.ObjectModel.update(req.body, {
        where: { [campoPk]: id }
      });

      if (data[0] === 1) {
        ValidateData(data[0] === 1, res, 201, ERDB404);
      } else {
        res.status(404).send(ERDB02);
      }
    } catch (e) {
      res.status(500).send(e);
    }
  };

  Delete = async (req, res) => {
    const { ER405, ERDB02, ERDB404 } = ErrorMessage;

    const { campoPk, condicion } = this.ObjectModel.Setting();

    const { WhereStado } = condicion;
    const { campoE, deleteR } = WhereStado;

    try {
      const { id } = req.params;

      if (this.ObjectModel.fieldAttributeMap.estado === campoE) {
        const data = await this.ObjectModel.update(
          { [campoE]: deleteR },
          {
            where: { [campoPk]: id }
          }
        );

        if (data) {
          ValidateData(data, res, 200, ERDB404);
        } else {
          res.status(404).send(ERDB02);
        }
      } else if (this.ObjectModel.fieldAttributeMap.id_test === campoPk) {
        const data = await this.ObjectModel.destroy({
          where: { [campoPk]: id }
        });

        ValidateData(data, res, 200, ERDB404);
      } else {
        res.status(405).send(ER405);
      }
    } catch (e) {
      res.status(500).send(e);
    }
  };
}

module.exports = Controller;
