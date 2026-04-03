const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { authRoutes } = require('./Routes/authroutes')

const port = process.env.PORT || 3003
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/user",authRoutes)


app.listen(port,()=>{
    console.log(`server is running port ${port}`)
})
