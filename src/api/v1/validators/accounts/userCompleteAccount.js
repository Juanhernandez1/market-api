const { body } = require('express-validator');
const User = require('../../../../models/mongoose/user');

const userCompleteAccountValidationRules = () => {
    return [
        body('address',"La dirección es requerida").exists().isLength({min: 10}).withMessage('La dirección debe tener al menos 10 caracteres'),
        body('phones',"El telefono es requerido").exists().isLength({min: 8}).withMessage('El telefono debe tener al menos 8 caracteres'),
        body('nit',"El nit es requerido").exists()
            .isLength({min: 10}).withMessage('El nit debe tener al menos 10 caracteres')
            .custom((value) => {
        return User.findOne({nit: value }).then(user => {
            if (user) {
                return Promise.reject('El nit ya existe !');
            }
        })
    })
    ]
}

module.exports = userCompleteAccountValidationRules;