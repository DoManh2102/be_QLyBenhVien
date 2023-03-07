const express = require('express');
const { getUser, register, login, deleteUser, updateUser } = require('../controller/userController');

const userRouter = express.Router();

userRouter.get('/get-user', getUser);
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.delete('/delete-user/:id', deleteUser);
userRouter.post('/update-user', updateUser);

module.exports = userRouter;
