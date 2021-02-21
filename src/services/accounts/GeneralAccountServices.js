const User = require('../../models/mongoose/user');
const eventEmitter = require('../../scripts/utils/events');
const jwt = require('../../scripts/utils/jwt');
const hasPassword = require('../../scripts/utils/hasPassword');
const mailSubscriber = require('../../subscribers/user/mail');
const generateCode = require('../../scripts/codeEmailVerify');
mailSubscriber(eventEmitter);


class GeneralAccountServices {
    constructor() {}

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
                const updateUser = await User.findByIdAndUpdate(findUser[0].id, {email_verified: true})
                return {
                    status: 200,
                    success: true,
                    data: "La cuenta fue verificada, por favor inicia sesión"
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

            if (findUser[0].email_verified === true) {
                return {
                    status: 200,
                    success: false,
                    data: "Su cuenta ya esta verificada !"
                }
            }

            const updateUser = await User.findByIdAndUpdate(findUser[0].id, {code_to_verify_email: code, send_at: calculateDate.toString()}, {new: true})
            eventEmitter.emit('resend-code',updateUser);

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
            if (findUser[0].email_verified === false) {
                return {
                    status: 200,
                    success: false,
                    data: "Su cuenta no esta verficada !"
                }
            }

            eventEmitter.emit('remember-psw',findUser[0]);

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

    async updatePassword(token,password) {
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
}

module.exports = GeneralAccountServices;