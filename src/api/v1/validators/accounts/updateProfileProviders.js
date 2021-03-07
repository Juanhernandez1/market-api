const { body } = require("express-validator");
const User = require("../../../../models/mongoose/user");

const updateProfileProviders = () => {
  return [
    body("cost_of_shipping", "El nombre es requerido")
      .exists()
      .matches(/^\d+(?:\.\d{0,2})$/)
      .withMessage("El formato correcto para ingresar el costo de envio es: 00.00"),

    body("delivery_business_days", "El nombre es requerido")
      .exists()
      .matches(/\d/)
      .withMessage("Los dias habilis de entrega deben ser datos numéricos"),

    body("name", "El nombre es requerido").exists(),

    body("address", "La dirección es requerida")
      .exists()
      .isLength({ min: 10 })
      .withMessage("La dirección debe tener al menos 10 caracteres"),

    body("phones", "El telefono es requerido")
      .exists()
      .isLength({ min: 8 })
      .withMessage("El telefono debe tener al menos 8 caracteres"),

    body("nit", "El nit es requerido")
      .exists()
      .isLength({ min: 10 })
      .withMessage("El nit debe tener al menos 10 caracteres")
      .custom((value, { req }) => {
        return User.findOne({ nit: value, _id: { $ne: req.params.user_id } }).then(user => {
          if (user) {
            return Promise.reject("El nit ya existe !");
          }
        });
      }),

    body("email", "El email no es correcto")
      .custom((value, { req }) => {
        return User.findOne({ email: value, _id: { $ne: req.params.user_id } }).then(user => {
          if (user) {
            return Promise.reject("El email ya existe");
          }
        });
      })
      .exists()
      .isEmail()
  ];
};

module.exports = updateProfileProviders;
