const { getJsonUser } = require("../../../../scripts/utils/returnJsonEntities");
const AuthService = require("../../../../services/servicesUsingMongoose/auth/AuthServices");
const loginValidationRules = require("../../validators/auth/login");
const validate = require("../../validators/validate");
const {
  invalidToken,
  saveToken
} = require("../../../../services/servicesUsingMongoose/auth/SecurityTokenServices");
const jwt = require("../../../../scripts/utils/jwt");
const authVerify = require("../../middleware/authVerify");

function authApi(router) {
  const authService = new AuthService();

  router.post("/accounts/login", [loginValidationRules()], validate, async function (req, res) {
    let { body: user } = req;
    const data = await authService.login({ user });

    if (data.success) {
      const jsonUser = await getJsonUser(data.data.user);
      const _user = data.data.user;
      return res.status(data.status).json({
        success: true,
        user: jsonUser,
        token: data.data.token
      });
    }

    return res.status(data.status).json({
      success: false,
      message: data.message || data.data
    });
  });

  router.post("/accounts/logout", authVerify, async function (req, res) {
    let _token = req.get("Authorization").split(" ");
    const { status, message, success } = await invalidToken(_token[1]);
    if (success) {
      return res.status(status).json({
        success,
        message
      });
    }
    return res.status(status).json({
      success,
      message: "Algo salio mal"
    });
  });

  router.get("/accounts/refresh-token", authVerify, async function (req, res) {
    let _token = req.get("Authorization").split(" ");
    const jsonUser = await getJsonUser(req.user);
    const token = await jwt.createToken({ user: req.user });
    const result = await saveToken(token, jsonUser.id);
    const invalidateToken = await invalidToken(_token[1]);
    return res.json({
      success: true,
      user: jsonUser,
      token: token
    });
  });
}

module.exports = authApi;
