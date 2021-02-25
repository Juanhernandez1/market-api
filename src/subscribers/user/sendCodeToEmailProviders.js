const {transport} = require('../../config/email/index');
const {sendCodeForVerifyEmail} = require('../../services/notifications/emailNotification');

function sendEmailProviders(myEmitter) {
    myEmitter.once('signup-providers',  function (data) {  // event listener
        sendCodeForVerifyEmail(transport, data).catch(console.error);
    })
}

module.exports = sendEmailProviders