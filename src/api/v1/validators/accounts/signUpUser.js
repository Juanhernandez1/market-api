const { body, validationResult } = require("express-validator");
const User = require("../../../../models/mongoose/user");

const signUpUserValidationRules = () => {
  return [
    body("name", "El nombre es requerido").exists(),
    body("email", "El email no es correcto")
      .custom(value => {
        return User.findOne({ email: value }).then(user => {
          if (user) {
            return Promise.reject("El email ya existe");
          }
        });
      })
      .exists()
      .isEmail(),
    body("password", "La contraseña debe contener al menos 5 caracteres")
      .not()
      .isIn(["123", "password", "god"])
      .withMessage("No uses palabras comunes para tu contraseña")
      .isLength({ min: 5 }),
    body("confirm_password").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("La confirmación de la contraseña no coincide con la contraseña");
      }
      return true;
    })
  ];
};

module.exports = signUpUserValidationRules;
