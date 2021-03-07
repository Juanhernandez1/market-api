const ErrorMessage = require("./ErrorMessage");
const ConditionsOr = require("./ConditionsOr");
const ValidateData = require("./ValidateData");

class Controller {
  constructor(ObjectModel, Op) {
    this.ObjectModel = ObjectModel;
    this.Operations = Op;
  }

  GetAll = async (req, res) => {
    const { ER500, ERDB404 } = ErrorMessage;

    const { ConfigFindAll } = this.ObjectModel.Setting();

    try {
      const { visibility } = req.params;
      const objconfig = ConfigFindAll(this.Operations, `${visibility}`);
      const data = await this.ObjectModel.findAll(objconfig);
      console.log(data);
      ValidateData(data, res, 200, ERDB404);
    } catch (error) {
      console.log(error);
      res.status(500).send(ER500);
    }
  };

  GetViewAll = async (req, res) => {
    const { ER500, ERDB404 } = ErrorMessage;

    const { ConfigFindAll, ConfigFindAllView } = this.ObjectModel.Setting();

    try {
      const { visibility } = req.params;

      let objconfig;

      if (ConfigFindAllView === null) {
        objconfig = ConfigFindAll(this.Operations, visibility);
      } else if (typeof ConfigFindAllView === "function") {
        objconfig = ConfigFindAllView(this.Operations, visibility);
      }
      const data = await this.ObjectModel.findAll(objconfig);

      ValidateData(data, res, 200, ERDB404);
    } catch (error) {
      res.status(500).send(ER500);
    }
  };

  SearchPk = async (req, res) => {
    const { ER500, ERDB02 } = ErrorMessage;
    const { ConfigFindAll } = this.ObjectModel.Setting();

    try {
      const { id } = req.params;

      const data = await this.ObjectModel.findByPk(id, ConfigFindAll(this.Operations));

      ValidateData(data, res, 200, ERDB02);
    } catch (error) {
      res.status(500).send(ER500);
    }
  };

  SearchOne = async (req, res) => {
    const { ER500, ERDB404LIKE } = ErrorMessage;
    const { ConfigFindAll, whereLike } = this.ObjectModel.Setting();

    try {
      const { dato } = req.params;

      const busqueda = ConditionsOr(whereLike, dato, this.Operations);

      const objconfig = ConfigFindAll(this.Operations);

      const data = await this.ObjectModel.findOne({
        ...objconfig,
        where: { [this.Operations.or]: busqueda, ...objconfig.where }
      });

      ValidateData(data, res, 200, ERDB404LIKE);
    } catch (error) {
      console.log(error);
      res.status(500).send(ER500);
    }
  };

  SearchMany = async (req, res) => {
    const { ER500, ERDB404LIKE } = ErrorMessage;
    const { ConfigFindAll, whereLike } = this.ObjectModel.Setting();

    try {
      const { dato } = req.params;

      const busqueda = ConditionsOr(whereLike, dato, this.Operations);

      const objconfig = ConfigFindAll(this.Operations);

      const data = await this.ObjectModel.findAll({
        ...objconfig,
        where: { [this.Operations.or]: busqueda, ...objconfig.where }
      });

      ValidateData(data, res, 200, ERDB404LIKE);
    } catch (error) {
      console.log(error);
      res.status(500).send(ER500);
    }
  };

  Create = async (req, res) => {
    const { ER500, ERDB01, ERDB404 } = ErrorMessage;
    try {
      const objBody = req.body;

      const data = await this.ObjectModel.create(objBody);

      ValidateData(data.dataValues, res, 201, ERDB404);
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

    const { FieldPk } = this.ObjectModel.Setting();

    try {
      const id = req.body[FieldPk];
      delete req.body[FieldPk];

      const data = await this.ObjectModel.update(req.body, {
        where: { [FieldPk]: id }
      });

      if (data[0] === 1) {
        ValidateData(data[0] === 1, res, 200, ERDB404);
      } else {
        res.status(404).send(ERDB02);
      }
    } catch (e) {
      res.status(500).send(e);
    }
  };

  Delete = async (req, res) => {
    const { ERDB404 } = ErrorMessage;
    const { FieldPk } = this.ObjectModel.Setting();

    try {
      const { id } = req.params;

      const data = await this.ObjectModel.destroy({
        where: { [FieldPk]: id }
      });

      ValidateData(data, res, 202, ERDB404);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  };
}

module.exports = Controller;
