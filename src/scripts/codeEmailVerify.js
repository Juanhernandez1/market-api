async function generateCode (salt) {
    let date = Date.now();
    let calculateDate =  date + ((5 * 60 * 1000))
    let code = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < salt; i++)
        code += possible.charAt(Math.floor(Math.random() * possible.length));
    return {
        code,
        calculateDate
    }
}

module.exports = generateCode
