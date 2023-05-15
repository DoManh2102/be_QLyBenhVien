const express = require('express');
const { bulkCreateSchedule, getScheduleByIdDoctor, getScheduleByDate } = require('../controller/scheduleController');

const scheduleRouter = express.Router();

scheduleRouter.post('/bulk-create-schedule', bulkCreateSchedule);
scheduleRouter.post('/get-scheduleByDoctorId', getScheduleByIdDoctor);
scheduleRouter.get('/get-scheduleByDate', getScheduleByDate);


module.exports = scheduleRouter;
