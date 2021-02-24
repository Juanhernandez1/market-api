const {getJsonUser} = require('../../../../scripts/utils/returnJsonEntities');
const UserAccountServices = require('../../../../services/servicesUsingMongoose/accounts/UserAccountServices');
const validate = require('../../validators/validate');
const signUpUserValidationRules  = require('../../validators/accounts/signUpUser');
const userCompleteAccountValidationRules = require('../../validators/accounts/userCompleteAccount');
const updateProfileUserValidationRules = require('../../validators/accounts/updateProfileUser');
const authVerify = require('../../middleware/authVerify');

function userAccounts(router) {
    const userAccountServices = new UserAccountServices();

    router.post('/accounts/users/sing-up', [signUpUserValidationRules()], validate , async function (req, res) {
        const {body: user } = req;
        const { data, success, status} = await userAccountServices.signUp({user});
        if (success) {
            const jsonUser = await getJsonUser(data, true);
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

    router.put('/accounts/users/complete-accounts',[userCompleteAccountValidationRules()],[authVerify,validate], async function(req, res) {
        const {body: user} = req;
        const user_id = req.user._id;
        const {data, success, status} = await userAccountServices.completeAccount(user,user_id);

        if(success) {
            return res.status(status).json({
                success,
                message: data,
            });
        }
        return res.status(status).json({
            success,
            message: data,
        });
    })

    router.put('/accounts/users/profiles/update/:user_id',updateProfileUserValidationRules(),[authVerify,validate], async function (req, res) {
        const {body: user} = req;
        const user_id = req.params.user_id;
        const {data, success, status } = await userAccountServices.updateProfile(user,user_id);
        if (success) {
            const jsonUser = await getJsonUser(data);
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
    })
}
module.exports = userAccounts;