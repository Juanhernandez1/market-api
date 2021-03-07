const path = require("path");
const { getJsonUser } = require("../../../../scripts/utils/returnJsonEntities");
const GeneralAccountServices = require("../../../../services/servicesUsingMongoose/accounts/GeneralAccountServices");
const resendCodeValidationRules = require("../../validators/accounts/resendCode");
const validate = require("../../validators/validate");
const confirmPasswordValidationRules = require("../../validators/accounts/confirmPassword");
const confirmAccountValidationRules = require("../../validators/accounts/confirmAccount");
const jwt = require("../../../../scripts/utils/jwt");
const URIForS3 = require("../../../../scripts/utils/URIForS3");
const { isThereFile, validateExtensionFile } = require("../../validators/images/validateImage");
const authVerify = require("../../middleware/authVerify");

function generalAccounts(router) {
  const generalAccountServices = new GeneralAccountServices();

  router.post(
    "/accounts/resend-code",
    [resendCodeValidationRules()],
    validate,
    async function (req, res) {
      const { body: user } = req;
      const { data, success, status } = await generalAccountServices.resendCode({ user });
      if (success) {
        return res.status(status).json({
          success: true,
          message: data
        });
      }
      return res.status(status).json({
        success: false,
        message: data
      });
    }
  );

  router.post(
    "/accounts/remember-password",
    [resendCodeValidationRules()],
    validate,
    async function (req, res) {
      const { body: user } = req;
      const { data, success, status } = await generalAccountServices.rememberPassword({ user });
      if (success) {
        return res.status(status).json({
          success: true,
          message: data
        });
      }

      return res.status(status).json({
        success: false,
        message: data
      });
    }
  );

  router.get("/accounts/reset-password/:token", async function (req, res) {
    let token = req.params.token;
    let verify = await jwt.verifyToken(token);
    if (verify) {
      return res.sendFile(path.resolve(__dirname, "../../../../../views/resetPsw.html"));
    }

    return res.status(401).json({
      success: false,
      message: "El link para cambiar la contraseña a expirado"
    });
  });

  router.put(
    "/accounts/update-password/:token",
    [confirmPasswordValidationRules()],
    validate,
    async function (req, res) {
      let token = req.params.token;
      let { body } = req;
      let verify = await jwt.verifyToken(token);
      if (verify) {
        const { data, success, status } = await generalAccountServices.updatePasswordForgotten(
          token,
          body.password
        );
        if (success) {
          return res.status(status).json({
            success: true,
            message: "La contraseña fue modificada"
          });
        }
        return res.status(status).json({
          success: false,
          message: data
        });
      }
      return res.status(401).json({
        success: false,
        message: "El link para cambiar la contraseña a expirado"
      });
    }
  );

  router.post(
    "/accounts/verify-emails",
    [confirmAccountValidationRules()],
    validate,
    async function (req, res) {
      const { body: user } = req;
      const { data, success, status } = await generalAccountServices.verifyEmail({ user });
      if (success) {
        const jsonUser = await getJsonUser(data.user);
        return res.status(status).json({
          success: true,
          user: jsonUser,
          token: data.token
        });
      }
      return res.status(status).json({
        success: false,
        message: data
      });
    }
  );

  router.put(
    "/accounts/reset-password",
    confirmPasswordValidationRules(),
    [authVerify, validate],
    async function (req, res) {
      const user_id = req.user._id;
      const { body: user } = req;
      const { data, success, status } = await generalAccountServices.resetPassword(user, user_id);
      if (success) {
        return res.json({
          success,
          message: data
        });
      }
      return res.status(status).json({
        success,
        data
      });
    }
  );

  router.put(
    "/images/profile",
    [authVerify, isThereFile, validateExtensionFile],
    async function (req, res) {
      const extension = req.files.image.name.split(".");
      const user_id = req.user._id;
      const imageName = user_id + "." + extension[1];
      const dataImage = req.files;

      const params = {
        ContentType: req.files.image.mimetype,
        Bucket: URIForS3.USERS_FOLDER,
        Key: user_id + "." + extension[1],
        ACL: URIForS3.ACL,
        Body: dataImage.image.data
      };

      const { status, success, user } = await generalAccountServices.replaceImageProfile(
        params,
        user_id
      );
      if (success) {
        const jsonUser = await getJsonUser(user);
        return res.json({
          success,
          user: jsonUser
        });
      }
      return res.status(status).json({
        success,
        user
      });
    }
  );
}
module.exports = generalAccounts;
