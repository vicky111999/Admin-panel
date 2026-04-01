const express = require('express')
const { register, login, forgotpassword, resetpassword } = require('../Controller/authcontroller')

const authRoutes = express.Router()

authRoutes.post("/register",register)
authRoutes.post('/login',login)
authRoutes.post('/forgotpassword',forgotpassword)
authRoutes.post('/resetpassword',resetpassword)

module.exports = {authRoutes}