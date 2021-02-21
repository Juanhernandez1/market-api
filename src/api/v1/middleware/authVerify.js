const jwt = require('../../../scripts/utils/jwt');
const { tokenIsActive } = require('../../../services/auth/SecurityTokenServices');
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
    req.user = jwt.decodePayload(_token[1]).user
    next()
}

module.exports = authVerify;