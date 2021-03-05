function ValidateData(params, res, status, ERDB404) {
  if (params) {
    switch (status) {
      case 200:
        res.status(status).send(params);
        break;

      case 201:
        res.status(status).send({
          message: "Registro Creado Satisfactoriamente",
          Estado: true
        });
        break;

      case 202:
        res.status(status).send({
          message: "Registro Actualizado Satisfactoriamente",
          Estado: true
        });
        break;

      default:
        break;
    }
  } else {
    res.status(404).send(ERDB404);
  }
}

module.exports = ValidateData;
