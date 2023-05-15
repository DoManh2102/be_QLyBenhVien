const { Schedules, allCode } = require('../models')
require('dotenv').config()
var _ = require('lodash');
var moment = require('moment');


const bulkCreateScheduleService = (data) => {
    console.log('data', data);
    const { arrSchedule, doctorId, date } = data
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !arrSchedule && !doctorId && !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required param!',
                })
            }
            else {
                let existingSchedule = await Schedules.findAll({
                    where: { doctorId, date },
                    raw: true
                })

                //convert date
                if (existingSchedule && existingSchedule.length > 0) {
                    existingSchedule = existingSchedule.map(item => {
                        item.date = moment(item.date).format('YYYY/MM/DD')
                        return item
                    })
                }

                // cách 1: thêm những object không có trong db https://stackoverflow.com/questions21987909how-to-get-the-difference-between-two-arrays-of-objects-in-javascript
                // const arrDifferences = _.differenceBy(arrSchedule, existingSchedule, 'timeType')
                // if (arrDifferences && arrDifferences.length > 0) {
                //     await Schedules.bulkCreate(arrDifferences)
                // }

                // cách 2: xoá dữ Schedules where { doctorId, date } và thêm lại dữ liệu mới
                if (arrSchedule && arrSchedule.length > 0) {
                    await Schedules.destroy({
                        where: { doctorId, date }
                    }).then(() => Schedules.bulkCreate(arrSchedule))
                }
                resolve({
                    errCode: 0,
                    message: 'Ok',
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getScheduleByIdDoctorService = (input) => {
    const { date, doctorId } = input;
    return new Promise(async (resolve, reject) => {
        try {
            if (!date || !doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required param!',
                })
            }
            const schesuleById = await Schedules.findAll({
                where: { doctorId, date },
                attributes: ['timeType'],
                include: [
                    {
                        model: allCode,
                        as: 'timeTypeData',
                        attributes: ['value_EN', 'value_VI',]
                    },
                ],
                nest: true,
                raw: true
            })
            resolve({
                errCode: 0,
                message: 'Oke',
                data: schesuleById
            })
        } catch (error) {
            reject(error)
        }
    })
}

const getScheduleByDateService = (date) => {
    return new Promise(async (resolve, reject) => {
        try {
            const schesuleByDate = await Schedules.findAll({
                where: { date },
                attributes: ['timeType'],

            })
            resolve({
                errCode: 0,
                message: 'Oke',
                data: schesuleByDate
            })
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    bulkCreateScheduleService,
    getScheduleByIdDoctorService,
    getScheduleByDateService
}


