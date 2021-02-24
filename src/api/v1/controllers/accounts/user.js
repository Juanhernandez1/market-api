const {getJsonUser} = require('../../../../scripts/utils/returnJsonEntities');
const UserAccountServices = require('../../../../services/servicesUsingMongoose/accounts/UserAccountServices');
const validate = require('../../validators/validate');
const confirmAccountValidationRules = require('../../validators/accounts/confirmAccount');
const signUpUserValidationRules  = require('../../validators/accounts/signUpUser');
const userCompleteAccountValidationRules = require('../../validators/accounts/userCompleteAccount');
const authVerify = require('../../middleware/authVerify');

function userAccounts(router) {
    const userAccountServices = new UserAccountServices();

    router.post('/accounts/users/sing-up', [signUpUserValidationRules()], validate , async function (req, res) {
        const {body: user } = req;
        const { data, success, status} = await userAccountServices.signUp({user});
        const jsonUser = await getJsonUser(data, true);
        if (success) {
            return res.status(status).json({
                success,
                user: jsonUser,
                message: 'Please confirm your email'
            })
        }
        return res.status(status).json({
            success,
            data
        });
    });

    router.post('/accounts/users/verify-emails',[confirmAccountValidationRules()], validate, async function (req, res) {
        const {body: user } = req;
        const { data, success, status } = await userAccountServices.verifyEmail({user});
        const jsonUser = await getJsonUser(data.user);
        if (success) {
            return res.status(status)
                .json({
                    success: true,
                    user: jsonUser,
                    token: data.token
                })
        }
        return res.status(status).json({
            success: false,
            message: data
        })
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
}
module.exports = userAccounts;