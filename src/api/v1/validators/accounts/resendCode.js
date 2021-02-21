const { body, validationResult } = require('express-validator');

const resendCodeValidationRules = () => {
    return [
        body('email',"El email no es correcto").isEmail(),
    ]
}

module.exports =  resendCodeValidationRules ;