const {transport} = require('../../config/email/index');
const {sendCodeForVerifyEmail, sendLinkForResetPassword} = require('../../services/notifications/emailNotification');

function mailSubscriber(myEmitter) {
    myEmitter.on('signup',  function (data) {  // event listener
        sendCodeForVerifyEmail(transport, data).catch(console.error);
    })

    myEmitter.on('resend-code', function (data) {
        sendCodeForVerifyEmail(transport, data).catch(console.error);;
    })

    myEmitter.on('remember-psw', function (data) {
        sendLinkForResetPassword(transport, data).catch(console.error);
    });
}

module.exports = mailSubscriber