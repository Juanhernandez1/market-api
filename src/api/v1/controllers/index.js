const express = require('express');
const userAccountRouter = require('./accounts/user');
const generalAccountRouter= require('./accounts/general');
const authRouter = require('./auth/auth');
const router = express.Router();

userAccountRouter(router);
generalAccountRouter(router);
authRouter(router);

module.exports = router;