const {transport} = require('../../config/email/index');
const {sendCodeForVerifyEmail} = require('../../services/notifications/emailNotification');

function sendEmailUser(myEmitter) {
    myEmitter.once('signup-users',  function (data) {  // event listener
        sendCodeForVerifyEmail(transport, data).catch(console.error);
    })
}

module.exports = sendEmailUser