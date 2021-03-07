const { body } = require("express-validator");

const confirmPassword = () => {
  return [
    body("password", "La contraseña debe contener al menos 5 caracteres")
      .exists()
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

module.exports = confirmPassword;
