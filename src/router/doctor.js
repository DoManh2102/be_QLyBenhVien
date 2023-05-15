const express = require('express');
const { getTopDoctor, getAllDoctor, createDetailInfoDoctor, getDoctorById } = require('../controller/doctorController');

const doctorRouter = express.Router();

doctorRouter.get('/get-doctor', getTopDoctor);
doctorRouter.get('/get-allDoctor', getAllDoctor);
doctorRouter.post('/create-detailDoctor', createDetailInfoDoctor);
doctorRouter.get('/get-doctorById', getDoctorById);

module.exports = doctorRouter;
