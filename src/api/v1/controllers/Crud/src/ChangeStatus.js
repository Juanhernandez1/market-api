function ChangeStatus(stateParam, filedPk, value, include) {
  if (stateParam) {
    let state;
    let obj;
    // * validando que exista la variable stateParam y reemplazar el state
    if (stateParam !== undefined) {
      state = stateParam;
    } else {
      state = value;
    }
    // * Objeto de Configuración de Consulta
    if (include) {
      obj =
        state !== null
          ? {
              include,
              raw: true,
              nest: true
            }
          : {
              include,
              raw: true,
              nest: true,
              where: { [filedPk]: state }
            };
    } else {
      obj =
        state !== null
          ? {
              raw: true,
              nest: true
            }
          : {
              raw: true,
              nest: true,
              where: { [filedPk]: state }
            };
    }

    return obj;
  }
  return {};
}

module.exports = ChangeStatus;
