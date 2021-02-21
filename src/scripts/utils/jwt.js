require('dotenv').config();
const fs =  require('fs')
const jwt = require('jsonwebtoken')
const path = require('path');

const privateKey = fs.readFileSync(path.resolve(__dirname, "../../../private.key"),'utf-8');
const publicKey = fs.readFileSync(path.resolve(__dirname, "../../../public.key"),'utf-8');

const signOptions = {
    issuer:  'survey-app',
    subject:  'survey@gmail.com',
    audience:  'Client_Identity',
    expiresIn:  process.env.EXP_TOKEN,    // 3 hours validity
    algorithm:  "RS256"
};

async function createToken(payload) {
    return jwt.sign(payload,privateKey, signOptions);
}

async function verifyToken(token) {
    try{
        return  jwt.verify(token, publicKey, signOptions);
    }catch (err){
        return false;
    }
}

async function decodePayload(token)  {
    let decoded = jwt.decode(token, {complete: true});
    return decoded.payload
}

module.exports = {
    createToken,
    verifyToken,
    decodePayload
}

