const { bulkCreateScheduleService, getScheduleByIdDoctorService, getScheduleByDateService } = require("../services/scheduleService");


const bulkCreateSchedule = async (req, res) => {
    try {
        const result = await bulkCreateScheduleService(req.body)
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

const getScheduleByIdDoctor = async (req, res) => {
    try {
        const result = await getScheduleByIdDoctorService(req.body);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

const getScheduleByDate = async (req, res) => {
    try {
        const result = await getScheduleByDateService(req.body);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    bulkCreateSchedule,
    getScheduleByIdDoctor,
    getScheduleByDate
}
