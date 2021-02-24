const {getJsonUser} = require('../../../../scripts/utils/returnJsonEntities');
const Oauth2Services = require('../../../../services/servicesUsingMongoose/auth/Oauth2Services');
const oAuth2Verify = require('../../middleware/oAuth2Verify');
const validate = require('../../validators/validate');
const oAuth2ValidationRules = require('../../validators/auth/oAuth2');


function oAuth2(router) {
    const oAuth2Services = new Oauth2Services();

    router.post('/accounts/users/google-sing-up', [oAuth2ValidationRules()], [validate,oAuth2Verify] , async function (req, res) {
        const { oauth2 } = req;
        const { success, is_oauth2 , data} = await oAuth2Services.emailExist(oauth2);
        if(!success) {
            return res.status(422)
                .json({
                    success,
                    message: "El email ya existe !"
                })
        }
        const { status, success: _success, data : _data } = await  oAuth2Services.signupOauth2(is_oauth2,data);
        const jsonUser = await getJsonUser(_data.dat);
        if (_success) {
            return res.status(status)
                .json({
                    success: true,
                    user: jsonUser,
                    token: _data.token
                })
        }

        return res.status(status)
            .json({
                success,
                message: "Algo salio mal"
            })
    });

}
module.exports = oAuth2;