const { body } = require('express-validator');

const loginValidationRules = () => {
    return [
        body('email',"El email no es correcto").isEmail(),
        body('password','La es requerida')
            .exists()
            .not()
            .isIn(['123', 'password', 'god'])
            .withMessage('No uses palabras comunes para tu contraseña')
            .isLength({min: 5}),
    ]
}

module.exports = loginValidationRules;