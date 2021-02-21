const jwt = require('../../scripts/utils/jwt');

async function sendCodeForVerifyEmail(transport, data) {
    let info = await transport.sendMail({
        from: '"no reply 👻" <noreply@gmail.com>',
        to: data.email,
        subject: "Confirmar cuenta ✔",
        text: "Hola  "+ data.name +" !",
        html: "<p>Por favor verifica tu cuenta con el siguiente codigo:  <b>"+ data.code_to_verify_email +"</b></p>",
    });
    console.log("Email sent" + info.messageId);
}

async function sendLinkForResetPassword(transport, data) {
    let payload = {
        user: {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
        }
    }
    let token = await jwt.createToken(payload);
    let info = await transport.sendMail({
        from: '"no reply 👻" <noreply@gmail.com>',
        to: data.email,
        subject: "Confirmar cuenta ✔",
        text: "Hola  "+ data.name +" !",
        html: "<p>Por favor has clic sobre el siguiente link, para cambiar tu contraseña: " +
            "</p> " +
            "<a href='http://localhost:3333/api/v1/accounts/reset-password/"+token+"'> Cambiar contraseña</a>",
    });
    console.log("Email sent" + info.messageId);
}


module.exports = {
    sendCodeForVerifyEmail,
    sendLinkForResetPassword
}