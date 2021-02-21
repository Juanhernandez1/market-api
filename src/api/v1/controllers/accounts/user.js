const UserAccountServices = require('../../../../services/accounts/UserAccountServices');
const validate = require('../../validators/validate');
const signUpUserValidationRules  = require('../../validators/accounts/signUpUser');


function userAccounts(router) {
    const userAccountServices = new UserAccountServices();
    router.post('/accounts/users/sing-up', [signUpUserValidationRules()], validate , async function (req, res) {
        const {body: user } = req;
        const { data, success, status} = await userAccountServices.signUp({user});
        if (success) {
            return res.status(status).json({
                success,
                user: {
                    id: data._id,
                    avatar: data.avatar,
                    name: data.name,
                    email: data.email,
                    email_verify: false
                },
                message: 'Please confirm your email'
            })
        }
        return res.status(status).json({
            success,
            data
        });
    });
}
module.exports = userAccounts;