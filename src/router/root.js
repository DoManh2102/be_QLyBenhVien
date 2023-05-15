const express = require('express');
const allCodeRouter = require('./allCode');
const doctorRouter = require('./doctor');
const scheduleRouter = require('./schedule');
const userRouter = require('./user');

const rootRouter = express.Router();

rootRouter.use('/user', userRouter)
rootRouter.use('/allCode', allCodeRouter)
rootRouter.use('/doctor', doctorRouter)
rootRouter.use('/schedule', scheduleRouter)

module.exports = rootRouter