const {transport} = require('../../config/email/index');
const {sendCodeForVerifyEmail} = require('../../services/notifications/emailNotification');

function sendCodeToEmailProviders(myEmitter) {
    myEmitter.on('signup-providers',  function (data) {  // event listener
        sendCodeForVerifyEmail(transport, data).catch(console.error);
    })
}

module.exports = sendCodeToEmailProviders