const User = require('../../../models/mongoose/user');
const hasPassword = require('../../../scripts/utils/hasPassword');
const eventEmitter = require('../../../scripts/utils/events');
const jwt = require('../../../scripts/utils/jwt');
const {saveToken } = require('../auth/SecurityTokenServices');
const mailSubscriber = require('../../../subscribers/user/mail');
const generateCode = require('../../../scripts/codeEmailVerify');
mailSubscriber(eventEmitter);

class UserAccountServices {
    constructor() {}

    async signUp({user}) {
        const {email, password, name } = user;
        const hashedPassword = await hasPassword.hash(password);
        const {code, calculateDate} = await generateCode(5);

        const _user = new User( {
            name: name,
            email: email,
            password: hashedPassword,
            code_to_verify_email: code,
            send_at: calculateDate.toString()
        });

        try {
            const data = await _user.save({timestamps:true, validateBeforeSave:true});
            eventEmitter.emit('signup',data);
            return {
                status: 201,
                data,
                success: true
            }
        }catch (err) {
            return {
                status: 500,
                data: err,
                success: false
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

    async completeAccount(user, user_id) {
        const {address, phones, coordinates, nit} = user;
        try {
            const findUser = await User.findByIdAndUpdate(user_id,{address: address, nit: nit, phones: phones, coordinates: coordinates }, {new: true})
            if(findUser) {
                return {
                    status: 200,
                    success: true,
                    data: "Cuenta Completada",
                }
            }
            return {
                status: 404,
                success: false,
                data: "El usuario no fue encontrado",
            }
        }catch (err) {
            return {
                status: 500,
                success: false,
                data: err.message,
            }
        }
    }
}

module.exports = UserAccountServices;