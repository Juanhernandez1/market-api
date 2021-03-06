const User = require("../../../models/mongoose/user");
const jwt = require("../../../scripts/utils/jwt");
const hasPassword = require("../../../scripts/utils/hasPassword");
const { saveToken } = require("./SecurityTokenServices");

class AuthServices {
  constructor() {}

  async login({ user }) {
    const { email, password } = user;
    try {
      const findUser = await User.find({ email: email }).exec();
      if (findUser.length === 0) {
        return {
          status: 404,
          success: false,
          message: "Credenciales incorrectas"
        };
      }
      if (findUser[0].is_email_verified === false) {
        return {
          status: 403,
          success: false,
          message: "La cuenta no esta verificada !"
        };
      }
      const isSame = await hasPassword.isSame(password, findUser[0].password);

      if (!isSame) {
        return {
          status: 404,
          success: false,
          message: "Credenciales incorrectas !"
        };
      }

      const payload = { user: findUser[0] };
      const token = await jwt.createToken(payload);
      const result = await saveToken(token, findUser[0].id);
      return {
        status: 200,
        success: true,
        data: {
          token,
          user: findUser[0]
        },
        message: "Logged in"
      };
    } catch (err) {
      return {
        status: 500,
        data: err
      };
    }
  }
}

module.exports = AuthServices;
