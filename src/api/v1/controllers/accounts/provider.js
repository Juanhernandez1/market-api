const {getJsonUser} = require('../../../../scripts/utils/returnJsonEntities');
const ProviderAccountServices = require('../../../../services/servicesUsingMongoose/accounts/ProviderAccountServices');
const signUpProviderValidationRules = require('../../validators/accounts/signUpProvider');
const validate = require('../../validators/validate');

function userAccounts(router) {
    const providerAccountServices = new ProviderAccountServices();

    router.post('/accounts/providers/sing-up' , [signUpProviderValidationRules()], validate, async function (req, res) {
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
}
module.exports = userAccounts;