const { verifyGoogleSignUpToken } = require('../../../scripts/utils/jwt');

let oAuth2Verify = async (req,res, next) => {
    const { token } = req.body;
    const {success, payload } = await verifyGoogleSignUpToken(token);
    if (!success) {
        return res.status(401).json({
            success,
            message: "El token no es valido !."
        })
    }
    req.oauth2 = {
        avatar: payload.picture,
        name: payload.name,
        email: payload.email
    };
    next();
}

module.exports = oAuth2Verify;