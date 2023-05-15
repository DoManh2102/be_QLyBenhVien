const express = require('express');
const { getAllCode } = require('../controller/allCodeController');

const allCodeRouter = express.Router();

allCodeRouter.get('/get-allCode', getAllCode);

module.exports = allCodeRouter;
