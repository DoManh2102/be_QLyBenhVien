const { User, allCode, Markdown_Editor } = require('../models')

const getTopDoctorService = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const listDoctor = await User.findAll({
                limit,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: allCode, as: 'positionData', attributes: ['value_EN', 'value_VI'] },
                    { model: allCode, as: 'genderData', attributes: ['value_EN', 'value_VI'] }
                ],
            });
            resolve({
                errCode: 0,
                message: 'Ok',
                doctor: listDoctor
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllDoctorService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getAllDoctor = await User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                },
            })
            resolve({
                errCode: 0,
                message: 'Ok',
                data: getAllDoctor
            })
        } catch (error) {
            reject(error)
        }
    })
}

const createDetailInfoDoctorService = (data) => {
    console.log('data', data);
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.contentHTML || !data.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            }
            else {
                //check doctorId is exist??
                // const doctorIdIsExist = await Markdown_Editor.findOne({
                //     where: { doctorId: data.doctorId }
                // })
                // if (doctorIdIsExist) {
                //     resolve({
                //         errCode: 2,
                //         errMessage: 'Doctor info already exists'
                //     });
                // }
                // else {
                const createDetailtDoctor = await Markdown_Editor.create({
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    description: data.description,
                    doctorId: data.doctorId
                })
                resolve({
                    errCode: 0,
                    message: 'Save info doctor success!',
                })
                // }
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getDoctorByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: 'Missing id parameter!',
                    data: getDoctorById
                })
            }
            const getDoctorById = await User.findOne({
                where: {
                    id
                },
                attributes: {
                    exclude: ['password', 'image']
                },
                include: [
                    { model: Markdown_Editor, attributes: ['contentHTML', 'contentMarkdown', 'description'] },
                    { model: allCode, as: 'positionData', attributes: ['value_EN', 'value_VI'] },

                ],
            })
            resolve({
                errCode: 0,
                message: 'Ok',
                data: getDoctorById
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getTopDoctorService,
    getAllDoctorService,
    createDetailInfoDoctorService,
    getDoctorByIdService
}


