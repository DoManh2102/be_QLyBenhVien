const { allCode } = require('../models')

const getAllCodeService = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (type) {
                const allCodeByType = await allCode.findAll({
                    where: {
                        type
                    }
                })
                resolve({
                    error: '0',
                    message: 'Ok',
                    allCodeByType
                })
            }
            else {
                const getAllCode = await allCode.findAll()
                resolve({
                    error: '0',
                    message: 'Ok',
                    getAllCode
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllCodeService,
}

//sequelize-cli db:migrate:undo --name 20230211073623-create-user.js
// npx sequelize-cli db:migrate:undo:all --to 20230211073623-create-user.js