const User = require('../../../models/mongoose/user');
const Event = require('../../../config/event/Event');
const jwt = require('../../../scripts/utils/jwt');
const uriAws = require('../../../scripts/utils/URIForS3');
const {saveToken } = require('../auth/SecurityTokenServices');
const hasPassword = require('../../../scripts/utils/hasPassword');
const generateCode = require('../../../scripts/codeEmailVerify');
const ImageServices = require('../image/ImageServices');
const resendCodeToEmailSubscriber = require('../../../subscribers/user/resendCodeToEmail');
const sendLinkToResetPwsSubscriber = require('../../../subscribers/user/sendLinkToResetPws');
resendCodeToEmailSubscriber(Event.instance.emitter);
sendLinkToResetPwsSubscriber(Event.instance.emitter);

class GeneralAccountServices {
    constructor() {
        this.imageServices = new ImageServices();
    }
    async resendCode({user}) {
        const {email } = user;
        const {code, calculateDate} = await generateCode(5);
        try {
            const findUser = await User.find({ email:email }).exec();
            if (findUser.length === 0 ) {
                return {
                    status: 404,
                    success: false,
                    data: "La cuenta de usuario no existe !"
                }
            }

            if (findUser[0].is_email_verified === true) {
                return {
                    status: 200,
                    success: false,
                    data: "Su cuenta ya esta verificada !"
                }
            }

            const updateUser = await User.findByIdAndUpdate(findUser[0].id, {code_to_verify_email: code, send_at: calculateDate.toString()}, {new: true})
            Event.instance.emitter.emit('resend-code',updateUser);

            return {
                status: 200,
                success: true,
                data: "Hemos enviado un código a tu correo electronico"
            }
        }catch (err) {
            return {
                status: 500,
                success: false,
                data: err
            }
        }
    }

    async rememberPassword({user}) {
        const {email } = user;
        try {
            const findUser = await User.find({ email: email }).exec();
            if (findUser.length === 0 ) {
                return {
                    status: 404,
                    success: false,
                    data: "La cuenta de usuario no existe !"
                }
            }
            if (findUser[0].is_email_verified === false) {
                return {
                    status: 200,
                    success: false,
                    data: "Su cuenta no esta verficada !"
                }
            }

            Event.instance.emitter.emit('remember-psw',findUser[0]);

            return {
                status: 200,
                success: true,
                data: "Hemos enviado un link para que puedas restablecer tu contraseña."
            }
        }catch (err) {
            return {
                status: 500,
                success: false,
                data: err
            }
        }
    }

    async updatePasswordForgotten(token,password) {
        const {user} = await jwt.decodePayload(token);
        try{
            const findUser = await User.findById(user.id).exec();
            if (!findUser) {
                return {
                    status: 404,
                    success: false,
                    data: "La cuenta de usuario no existe !"
                }
            }
            const hashedPassword = await hasPassword.hash(password)
            const updateUser = await  User.findByIdAndUpdate(findUser.id, {password: hashedPassword}, {new: true})

            return {
                status: 200,
                success: true,
                data: "La contraseña fue modificada !"
            }
        }catch (err) {
            return {
                status: 500,
                success: false,
                err
            }
        }
    }

    async verifyEmail({user}) {
        let now = Date.now();
        let date = 0;
        const {email, code } = user;

        try {
            const findUser = await User.find({ email:email , code_to_verify_email: code }).exec();
            if (findUser.length === 0 ) {
                return {
                    status: 404,
                    success: false,
                    data: "La cuenta de usuario no existe !"
                }
            }

            date = parseInt(findUser[0].send_at);
            if (now < date) {
                const updateUser = await User.findByIdAndUpdate(findUser[0].id, {is_email_verified: true})
                const payload = {  user: findUser[0] };
                const token = await jwt.createToken(payload);
                const result = await saveToken(token,findUser[0].id);
                return {
                    status: 200,
                    success: true,
                    data:{
                        token,
                        user: updateUser
                    }
                }
            }
            return {
                status: 422,
                success: false,
                data: "El código ha expirado, intenta enviar otro codigo nuevamente"
            }
        }catch (err) {
            return {
                status: 500,
                success: false,
                data: err
            }
        }
    }

    async resetPassword(user, user_id) {
        try {
            const hashedPassword = await hasPassword.hash(user.password);
            const findUser = await User.findByIdAndUpdate(user_id,{ password: hashedPassword }, {new : true});
            return {
                status: 200,
                success: true,
                data: "La contraseña fue modificada !"
            }
        }catch (err) {
            return {
                status: 500,
                success: false,
                data: err
            }
        }

    }

    async replaceImageProfile(params, user_id) {
        try {
            const imageWasUploaded = await this.imageServices.uploadImage(params);
            if (imageWasUploaded) {
                const uri = uriAws.URI_USERS+params.Key;
                const findUser = await  User.findByIdAndUpdate(user_id, {avatar: uri}, {new: true}).exec()
                return {
                    status: 200,
                    success: true,
                    user: findUser
                }
            } else  {
                return {
                    status: 500,
                    success: false,
                    user: null,
                }
            }
        }catch(err) {
            return {
                status: 500,
                success: false,
                user: null,
            }
        }
    }

}

module.exports = GeneralAccountServices;