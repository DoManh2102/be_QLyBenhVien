const { getUserServices, createNewUserService, handleLoginService, deleteUserService, editUserService } = require('../services/userServices')

//hàm đăng kí User
const register = async (req, res) => {
    const userNew = await createNewUserService(req.body)
    try {
        res.status(201).send(userNew)
    } catch (error) {
        res.status(500).send(error)
    }
}

//hàm login user
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {  // check ng dùng nhập email, password
        return res.status(500).json({
            errCode: 1,
            message: "Input parameter is missing",
            userLogin: {}
        })
    }
    let userLogin = await handleLoginService(email, password);
    return res.status(201).send({
        errCode: userLogin.errCode,
        message: userLogin.errMessage,
        userLogin: userLogin.user ? userLogin.user : {}
    })
}

// lấy ra tất cả
const getUser = async (req, res) => {
    const { name } = req.query;
    try {
        const user = await getUserServices(name)
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

//delte user
const deleteUser = async (req, res) => {
    const { id } = req.params;  //test axios headers
    if (!id) {
        return res.status(500).send({
            errCode: 1,
            errMessage: 'Missing required parameters'
        })
    } else {
        const responve = await deleteUserService(id)
        return res.status(201).send(responve)
    }
}

const updateUser = async (req, res) => {
    const user = req.body;
    const message = await editUserService(user)
    return res.status(200).send(message)
}

module.exports = {
    getUser,
    register,
    login,
    deleteUser,
    updateUser
}