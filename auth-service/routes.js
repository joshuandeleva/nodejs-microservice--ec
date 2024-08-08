const express = require('express');
const { doCreateUser, doLogin } = require('./controller');
const userRouter = express.Router();

userRouter.post('/addUser', doCreateUser)
userRouter.post('/loginUser', doLogin)


module.exports = userRouter;