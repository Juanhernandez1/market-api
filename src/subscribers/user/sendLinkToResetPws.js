const {transport} = require('../../config/email/index');
const {sendLinkForResetPassword} = require('../../services/notifications/emailNotification');

function mailSubscriber(myEmitter) {
    myEmitter.once('remember-psw', function (data) {
        sendLinkForResetPassword(transport, data).catch(console.error);
    });
}

module.exports = mailSubscriber