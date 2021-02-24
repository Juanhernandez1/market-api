const GeneralAccountServices = require('../../../../services/servicesUsingMongoose/accounts/GeneralAccountServices');
const resendCodeValidationRules = require('../../validators/accounts/resendCode');
const validate = require('../../validators/validate');
const confirmPasswordValidationRules = require('../../validators/accounts/confirmPassword');
const jwt = require('../../../../scripts/utils/jwt');

function generalAccounts(router) {
    const generalAccountServices = new GeneralAccountServices();

    router.post('/accounts/resend-code',[resendCodeValidationRules()],validate, async function(req, res) {
        const {body: user } = req;
        const { data, success, status} = await generalAccountServices.resendCode({user});
        if (success) {
            return res.status(status).json({
                success: true,
                message: data
            })
        }
        return res.status(status).json({
            success: false,
            message: data
        })
    });

    router.post('/accounts/remember-password',[resendCodeValidationRules()],validate, async function (req, res) {
        const {body: user } = req;
        const { data, success, status } = await generalAccountServices.rememberPassword({user});

        if (success) {
            return res.status(status).json({
                success: true,
                message: data
            })
        }

        return res.status(status).json({
            success: false,
            message: data
        })
    });

    router.get('/accounts/reset-password/:token',async function (req, res) {
        let token = req.params.token;
        let verify = await jwt.verifyToken(token);
        if (verify) {
            return res.render('')
        }

        return res.status(401).json( {
            success: false,
            message: "El link para cambiar la contraseña a expirado"
        })
    })

    router.put('/accounts/update-password/:token',[confirmPasswordValidationRules()], validate,  async function(req, res) {
        let token = req.params.token;
        let {body } = req;
        let verify = await jwt.verifyToken(token);
        if (verify) {
            const {data, success, status} = await generalAccountServices.updatePassword(token, body.password);
            if (success) {
                return res.status(status).json({
                    success: true,
                    message: "La contraseña fue modificada"
                })
            }
            return res.status(status).json({
                success: false,
                message: data
            })
        }
        return res.status(401).json( {
            success: false,
            message: "El link para cambiar la contraseña a expirado"
        })
    })
}
module.exports = generalAccounts;