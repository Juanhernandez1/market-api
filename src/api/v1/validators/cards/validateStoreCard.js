const { body } = require("express-validator");
const Card = require("../../../../models/mongoose/cards");

const cardValidationRules = () => {
  return [
    body("owner_name", "El nombre del titular es requerido")
      .exists()
      .isLength({ min: 5 })
      .withMessage("El nombre es muy corto"),
    body("number", "El número de la tarjeta  es requerido")
      .exists()
      .matches(/\d/)
      .withMessage("El número de la tarjeta no es valido, debe ingresar numeros")
      .custom(value => {
        return Card.findOne({ number: value }).then(card => {
          if (card) {
            return Promise.reject("El numero de la tarjeta ya existe !");
          }
        });
      }),
    body("due_date", "La fecha de expiracion de la tarjeta es requerida").exists(),
    body("ccv", "El ccv  es requerido")
      .isLength({ max: 3 })
      .withMessage("El ccv debe contener solo 3 numeros")
      .exists()
      .matches(/\d/)
      .withMessage("El ccv sebe ser numerico")
  ];
};

module.exports = cardValidationRules;
