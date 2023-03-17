const express = require('express');
const allCodeRouter = require('./allCode');
const doctorRouter = require('./doctor');
const userRouter = require('./user');

const rootRouter = express.Router();

rootRouter.use('/user', userRouter)
rootRouter.use('/allCode', allCodeRouter)
rootRouter.use('/doctor', doctorRouter)

module.exports = rootRouter