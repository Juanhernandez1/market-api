const {transport} = require('../../config/email/index');
const {sendCodeForVerifyEmail} = require('../../services/notifications/emailNotification');

function resendCode(myEmitter) {
    myEmitter.once('resend-code', function (data) {
        sendCodeForVerifyEmail(transport, data).catch(console.error);;
    })
}

module.exports = resendCode