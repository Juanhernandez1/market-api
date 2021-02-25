const { body } = require('express-validator');
const Card = require('../../../../models/mongoose/cards');

const loginValidationRules = () => {
    return [
        body('owner_name',"El email no es correcto").exists(),
        body('number',"El email no es correcto")
            .exists()
            .matches(/\d/)
            .withMessage('El número de la tarjeta no es valido')
            .custom((value) => {
                return Card.findOne({number: value}).then(card => {
                    if (card) {
                        return Promise.reject('El numero de la tarjeta ya existe !');
                    }
                })
            }),
        body('due_date',"El email no es correcto").exists(),
        body('ccv',"El email no es correcto")
            .exists()
            .matches(/\d/)
            .withMessage('El ccv sebe ser numerico'),
    ]
}

module.exports = loginValidationRules;