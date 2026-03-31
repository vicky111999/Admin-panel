const mysql = require('mysql2')
require('dotenv').config()

const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})

db.connect((err)=>{
    if(err) return console.log("Database not connected",err)
      return console.log("DB connected Successfully")  
})

module.exports = db