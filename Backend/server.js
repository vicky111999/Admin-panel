const express = require('express')
const cors = require('cors')
require('dotenv').config()
// require('./Config/initDB')
const { authRoutes } = require('./Routes/authroutes')

const port = process.env.PORT || 3003
const app = express()
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use("/api/auth",authRoutes)


app.listen(port,()=>{
    console.log(`server is running port ${port}`)
})
