const { getTopDoctorService, getAllDoctorService, createDetailInfoDoctorService, getDoctorByIdService } = require("../services/doctorService");


// lấy ra top doctor
const getTopDoctor = async (req, res) => {
    let { limit } = req.query;
    if (!limit) limit = 10;
    try {
        const doctor = await getTopDoctorService(+limit)
        res.status(201).send(doctor)
    } catch (error) {
        res.status(500).send(error)
    }
}

// lấy ra tất cả doctor
const getAllDoctor = async (req, res) => {
    try {
        const result = await getAllDoctorService();
        res.status(201).send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

//
const createDetailInfoDoctor = async (req, res) => {
    try {
        const result = await createDetailInfoDoctorService(req.body)
        res.status(201).send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

const getDoctorById = async (req, res) => {
    try {
        const result = await getDoctorByIdService(req.query.id)
        res.status(201).send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    getTopDoctor,
    getAllDoctor,
    createDetailInfoDoctor,
    getDoctorById
}