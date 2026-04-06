const express = require('express')
const { userfetch } = require('../Controller/admincontroller')
const { adminverify } = require('../Middleware/adminverify')

const adminRoutes = express.Router()

adminRoutes.get('/getallusers',adminverify,userfetch)

module.exports = {adminRoutes}