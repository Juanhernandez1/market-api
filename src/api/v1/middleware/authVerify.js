const jwt = require('../../../scripts/utils/jwt');
const { tokenIsActive } = require('../../../services/servicesUsingMongoose/auth/SecurityTokenServices');

let authVerify = async (req,res, next) => {
    let _token = req.get('Authorization').split(' ');
    let isValidToken = await jwt.verifyToken(_token[1]);
    let { isActive } = await tokenIsActive(_token[1]);

    if(!isValidToken || !isActive) {
        return res.status(401).json({
            success: false,
            message: "El token ha expirado !."
        })
    }
    let { user } = await jwt.decodePayload(_token[1]);
    req.user = user
    next()
}

module.exports = authVerify;