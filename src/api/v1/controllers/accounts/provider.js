const {getJsonUser, getJsonProvider} = require('../../../../scripts/utils/returnJsonEntities');
const ProviderAccountServices = require('../../../../services/servicesUsingMongoose/accounts/ProviderAccountServices');
const signUpProviderValidationRules = require('../../validators/accounts/signUpProvider');
const updateProfileProvidersValidationRules = require('../../validators/accounts/updateProfileProviders');
const authVerify = require('../../middleware/authVerify');
const isProvider = require('../../middleware/isProvider');
const validate = require('../../validators/validate');

function providerAccounts(router) {
    const providerAccountServices = new ProviderAccountServices();

    router.post('/accounts/providers/sing-up' , signUpProviderValidationRules(), validate, async function (req, res) {
        const { body: user} = req;
        const {data, success, status}  = await providerAccountServices.signUp({user});
        if (success) {
            const jsonUser = await getJsonUser(data);
            return res.status(status).json({
                success,
                user: jsonUser,
                message: 'Por favor confirma tu email, hemos enviado un codigo.'
            })
        }
        return res.status(status).json({
            success,
            data
        });
    });

    router.put('/accounts/providers/profiles/update/:user_id' , updateProfileProvidersValidationRules(), [authVerify, isProvider, validate], async function (req, res) {
        const {body: user} = req;
        const user_id = req.params.user_id;
        if (req.user._id !== user_id) {
            return res.status(404).json({
                success: false,
                message: "Cuenta no encontrada",
            });
        }
        const {data, success, status } = await providerAccountServices.updateProfile(user,user_id);
        if (success) {
            const jsonUser = await getJsonProvider(data);
            return res.status(status).json({
                success,
                user: jsonUser,
                message: 'Perfil actualizado'
            })
        }
        return res.status(status).json({
            success,
            message: data,
        });
    });
}
module.exports = providerAccounts;