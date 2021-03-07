const { body } = require("express-validator");

const oAuth2ValidationRules = () => {
  return [body("token", "El token de google sign up es requerido").exists()];
};

module.exports = oAuth2ValidationRules;
