const express = require('express')
const { register, login } = require('../Controller/authcontroller')
const { verifyToken } = require('../Middleware/authverify')

const authRoutes = express.Router()

authRoutes.post("/register",register)
authRoutes.post('/login',login)
authRoutes.get('/pro',verifyToken)

module.exports = {authRoutes}