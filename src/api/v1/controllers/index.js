const express = require('express');
const userAccountRouter = require('./accounts/user');
const providerAccountRouter = require('./accounts/provider');
const generalAccountRouter= require('./accounts/general');
const authRouter = require('./auth/auth');
const oAuth2Router = require('./auth/oAuth2');
const router = express.Router();

userAccountRouter(router);
providerAccountRouter(router);
generalAccountRouter(router);
authRouter(router);
oAuth2Router(router);

module.exports = router;