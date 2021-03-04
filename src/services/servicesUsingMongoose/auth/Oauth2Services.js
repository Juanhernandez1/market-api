const User = require('../../../models/mongoose/user');
const hasPassword = require('../../../scripts/utils/hasPassword');
const jwt = require('../../../scripts/utils/jwt');
const {saveToken} = require('./SecurityTokenServices');

class Oauth2Services {
    constructor() {}

    async emailExist(user) {
        try {
            const findUser = await User.findOne({email: user.email}).exec();
            if(findUser) {
                const result = await this.userHasGoogleSignUp(findUser);
                return result;
            }
            return {
                success: true,
                is_oauth2: false,
                data: user
            }
        }catch (err) {
            console.log(err);
            return false;
        }
    }

    async userHasGoogleSignUp(user) {
        if (user.is_oauth2 === true) {
            return  {
                success: true,
                is_oauth2: true,
                data: user
            }
        }
        return {
            success: false,
            is_oauth2: false,
            data: null
        }
    }

    async signupOauth2(is_oauth2 , data) {
        const hashedPassword = await hasPassword.hash("thisIsAtestPassord");
        try {
            if (!is_oauth2) {
                const user = new User( {
                    avatar: data.avatar,
                    name: data.name,
                    email: data.email,
                    password: hashedPassword,
                    code_to_verify_email: null,
                    send_at: null,
                    is_email_verified: true,
                    is_oauth2: true
                });
                const dat = await user.save({timestamps:true, validateBeforeSave:true});
                const token = await jwt.createToken({ user: dat });
                const result = await saveToken(token,data._id);
                    return {
                        status: 201,
                        success: true,
                        data: {
                            dat,
                            token
                        },
                        message: 'Logged in, user added'
                    }
                }
                const token = await jwt.createToken({user: data});
                const result = await saveToken(token,data._id);
                return {
                    status: 200,
                    success: true,
                    data:{
                        token,
                        dat: data
                    },
                    message: 'Logged in'
                }
            }catch (err) {
                return {
                    status: 500,
                    success: false,
                    data: err,
                    message: "error"
                }
            }
        }
}

module.exports = Oauth2Services;