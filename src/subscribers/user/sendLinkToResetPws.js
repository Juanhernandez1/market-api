const {transport} = require('../../config/email/index');
const {sendLinkForResetPassword} = require('../../services/notifications/emailNotification');

function sendLinkToResetPws(myEmitter) {
    myEmitter.on('remember-psw', function (data) {
        sendLinkForResetPassword(transport, data).catch(console.error);
    });
}

module.exports = sendLinkToResetPws