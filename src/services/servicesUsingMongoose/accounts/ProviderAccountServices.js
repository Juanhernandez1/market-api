const User = require('../../../models/mongoose/user');
const hasPassword = require('../../../scripts/utils/hasPassword');
const Event = require('../../../config/event/Event');
const mailSubscriber = require('../../../subscribers/user/mail');
const generateCode = require('../../../scripts/codeEmailVerify');
mailSubscriber(Event.instance.emitter);

class ProviderAccountServices {
    constructor() { }

    async signUp({user}) {
        const hashedPassword = await hasPassword.hash(user.password);
        const {code, calculateDate} = await generateCode(5);

        const _user = new User( {
            address: user.address,
            phones: user.phones,
            nit: user.nit,
            coordinates: user.coordinates,
            name: user.name,
            email: user.email,
            password: hashedPassword,
            code_to_verify_email: code,
            send_at: calculateDate.toString(),
            role: "provider"
        });

        try {
            const data = await _user.save({timestamps:true, validateBeforeSave:true});
            Event.instance.emitter.emit('signup-providers',data);
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

}

module.exports = ProviderAccountServices;