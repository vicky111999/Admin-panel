const express = require('express')
const { userfetch, userdelete, useredit } = require('../Controller/admincontroller')
const { adminverify } = require('../Middleware/adminverify')

const adminRoutes = express.Router()

adminRoutes.get('/getallusers',adminverify,userfetch)
adminRoutes.delete('/userdelete/:id',adminverify,userdelete)
adminRoutes.put('/userupdate/:id',useredit)
module.exports = {adminRoutes}