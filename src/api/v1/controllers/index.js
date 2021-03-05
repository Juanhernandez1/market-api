const express = require('express');
const userAccountRouter = require('./accounts/user');
const providerAccountRouter = require('./accounts/provider');
const generalAccountRouter= require('./accounts/general');
const authRouter = require('./auth/auth');
const oAuth2Router = require('./auth/oAuth2');
const cardRouter = require('./cards/cards');
const CURD = require("./Crud");
const router = express.Router();

userAccountRouter(router);
providerAccountRouter(router);
generalAccountRouter(router);
authRouter(router);
oAuth2Router(router);
cardRouter(router);
CURD(router);

module.exports = router;