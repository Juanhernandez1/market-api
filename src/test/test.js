const jwt = require('../scripts/utils/jwt');
let payload = {
    user: {
        name: "javier",
        email: "j@gmail.com",
    }
}

async function getJwt() {
    let _jwt = await jwt.createToken(payload)
    console.log(_jwt);
}

getJwt().catch(console.error);