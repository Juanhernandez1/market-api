const User = require('../../models/mongoose/user');
const hasPassword = require('../../scripts/utils/hasPassword');
const eventEmitter = require('../../scripts/utils/events');
const mailSubscriber = require('../../subscribers/user/mail');
const generateCode = require('../../scripts/codeEmailVerify');
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
}

module.exports = UserAccountServices;