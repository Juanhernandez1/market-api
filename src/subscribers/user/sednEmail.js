const {transport} = require('../../config/email/index');
const {sendCodeForVerifyEmail, sendLinkForResetPassword} = require('../../services/notifications/emailNotification');

function mailSubscriber(myEmitter) {
    myEmitter.once('signup-providers',  function (data) {  // event listener
        sendCodeForVerifyEmail(transport, data).catch(console.error);
    })
}

module.exports = mailSubscriber