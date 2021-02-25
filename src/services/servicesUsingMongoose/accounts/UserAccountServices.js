const User = require('../../../models/mongoose/user');
const hasPassword = require('../../../scripts/utils/hasPassword');
const Event = require('../../../config/event/Event');
const mailSubscriber = require('../../../subscribers/user/sendCodeToEmailUser');
const generateCode = require('../../../scripts/codeEmailVerify');
mailSubscriber(Event.instance.emitter);

class UserAccountServices {
    constructor() {}

    async signUp({user}) {
        const hashedPassword = await hasPassword.hash(user.password);
        const {code, calculateDate} = await generateCode(5);

        const _user = new User( {
            name: user.name,
            email: user.email,
            password: hashedPassword,
            code_to_verify_email: code,
            send_at: calculateDate.toString()
        });

        try {
            const data = await _user.save({timestamps:true, validateBeforeSave:true});
            Event.instance.emitter.emit('signup-users',data);
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

    async completeAccount(user, user_id) {
        try {
            const findUser = await User.findByIdAndUpdate(user_id,{address: user.address, nit: user.nit, phones: user.phones, coordinates: user.coordinates }, {new: true})
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

    async updateProfile(user, user_id) {
        try {
            const _user = await User.findByIdAndUpdate(user_id,{
                name: user.name,
                email: user.email,
                nit: user.nit,
                address: user.address,
                phones: user.phones,
                coordinates: user.coordinates
            },{new: true});

            return  {
                status: 200,
                success:true,
                data: _user
            }
        }catch (err) {
            return  {
                status: 200,
                success:true,
                data: user
            }
        }
    }
}

module.exports = UserAccountServices;