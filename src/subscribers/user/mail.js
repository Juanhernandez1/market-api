const {transport} = require('../../config/email/index');
const {sendCodeForVerifyEmail, sendLinkForResetPassword} = require('../../services/notifications/emailNotification');

function mailSubscriber(myEmitter) {
    myEmitter.once('signup-providers',  function (data) {  // event listener
        sendCodeForVerifyEmail(transport, data).catch(console.error);
    })

    myEmitter.once('signup-users',  function (data) {  // event listener
        sendCodeForVerifyEmail(transport, data).catch(console.error);
    })

    myEmitter.once('resend-code', function (data) {
        sendCodeForVerifyEmail(transport, data).catch(console.error);;
    })

    myEmitter.once('remember-psw', function (data) {
        sendLinkForResetPassword(transport, data).catch(console.error);
    });
}

module.exports = mailSubscriber