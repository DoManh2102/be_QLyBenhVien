
const { User } = require('../models')
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const salt = 10;

const getUserServices = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (name) {
                const userByName = await User.findAll({
                    where: {
                        firstName: {
                            [Op.like]: `%${name}%`
                        }
                    },
                    attributes: {
                        exclude: ['password']
                    }
                })
                resolve({
                    errCode: '0',
                    message: 'Ok',
                    user: userByName
                })
            }
            else {
                const listUser = await User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
                resolve({
                    errCode: '0',
                    message: 'Ok',
                    user: listUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const createNewUserService = (data) => {
    const { email, password, firstName, lastName, address, phoneNumber, gender, image, roleId, positionId } = data;
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist??
            const emailIsExist = await checkEmailUser(email)
            if (emailIsExist) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email already used'
                });
            } else {
                const hashPassword = await hashUserPassword(password)
                const userNew = await User.create({
                    email,
                    password: hashPassword,
                    firstName,
                    lastName,
                    address,
                    phoneNumber,
                    gender: gender === '1' ? true : false,
                    // image,
                    roleId,
                    // positionId
                })
                resolve({
                    errCode: 0,
                    message: 'Ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

const handleLoginService = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email có tồn tại trong db
            const isUserExist = await checkEmailUser(email)
            if (isUserExist) {
                let user = await User.findOne({
                    where: { email, },
                    attributes: ['email', 'firstName', 'lastName', 'roleId']
                })
                if (user) {
                    // giải mã hoá password ( true || false )
                    const checkPassword = await bcrypt.compare(password, isUserExist.password)
                    if (checkPassword) {
                        resolve({
                            errCode: 0,
                            message: 'Ok',
                            user
                        })
                    }
                    else {
                        resolve({
                            errCode: 3,
                            errMessage: 'Wrong password!'
                        })
                    }
                }
            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'Email not found !'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

//check email có tồn tại trong db
const checkEmailUser = (emailUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                where: {
                    email: emailUser,
                },
            })
            if (user) {
                resolve(user)
            }
            else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

const deleteUserService = (id) => {
    return new Promise(async (resolve, reject) => {
        let isUserExist = await User.findOne({
            where: {
                id
            }
        })
        try {
            if (isUserExist) {
                await User.destroy({
                    where: {
                        id
                    }
                })
                resolve({
                    errCode: 0,
                    message: "Ok"
                })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "User does not exist"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const editUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) { // id không có tồn tại
                resolve({
                    errCode: 2,
                    message: 'Missing requied parameter!'
                })
            }
            const user = await User.findOne({
                where: {
                    id: data.id
                },
            })
            if (user) {
                user.firstName = data.firstName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                //
                await user.save()
                resolve({
                    errCode: 0,
                    message: 'Update user success!'
                })
            } else {
                resolve({
                    errCode: 1,
                    message: 'User not found!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getUserServices,
    createNewUserService,
    hashUserPassword,
    handleLoginService,
    deleteUserService,
    editUserService
}