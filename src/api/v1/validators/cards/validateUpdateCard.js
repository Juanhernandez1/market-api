const { body } = require('express-validator');
const Card = require('../../../../models/mongoose/cards');

const cardValidationRules = () => {
    return [
        body('is_selected_to_pay',"is_selected_to_pay es requerido ! ")
            .exists().isBoolean().withMessage("is_selected_to_pay debe ser un valor booleano"),
        body('owner_name',"El nombre del titular es requerido").exists(),
        body('number',"El numero de la tarjeta es requerido")
            .exists()
            .matches(/\d/)
            .withMessage('El número de la tarjeta no es valido')
            .custom((value , {req}) => {
                return Card.findOne({number: value, _id:{ $ne: req.params.card_id }}).then(card => {
                    if (card) {
                        return Promise.reject('El numero de la tarjeta ya existe !');
                    }
                })
            }),
        body('due_date',"La fecha de expiracion de la tarjeta es requerida").exists(),
        body('ccv',"El ccv res requerido")
            .exists()
            .matches(/\d/)
            .withMessage('El ccv sebe ser numerico'),
    ]
}

module.exports = cardValidationRules;