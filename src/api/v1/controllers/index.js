const express = require('express');
const userAccountRouter = require('./accounts/user');
const generalAccountRouter= require('./accounts/general');
const authRouter = require('./auth/auth');
const oAuth2Router = require('./auth/oAuth2');
const router = express.Router();

userAccountRouter(router);
generalAccountRouter(router);
authRouter(router);
oAuth2Router(router);

module.exports = router;