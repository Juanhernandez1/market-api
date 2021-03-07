const { transport } = require("../../config/email/index");
const { sendCodeForVerifyEmail } = require("../../services/notifications/emailNotification");

function resendCodeToEmail(myEmitter) {
  myEmitter.on("resend-code", function (data) {
    sendCodeForVerifyEmail(transport, data).catch(console.error);
  });
}

module.exports = resendCodeToEmail;
