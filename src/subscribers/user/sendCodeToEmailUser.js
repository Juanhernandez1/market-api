const { transport } = require("../../config/email/index");
const { sendCodeForVerifyEmail } = require("../../services/notifications/emailNotification");

function sendCodeToEmailUser(myEmitter) {
  myEmitter.on("signup-users", function (data) {
    // event listener
    sendCodeForVerifyEmail(transport, data).catch(console.error);
  });
}

module.exports = sendCodeToEmailUser;
