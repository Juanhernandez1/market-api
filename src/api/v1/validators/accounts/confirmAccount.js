const { body } = require('express-validator');

const confirmAccountValidationRules = () => {
    return [
        body('email',"El email no es correcto").isEmail(),
        body('code',"El código debe tener 5 caracteres").exists().isLength({min:5, max:5}),
    ]
}

module.exports = confirmAccountValidationRules;