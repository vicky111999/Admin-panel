// const mysql = require('mysql2')
// require('dotenv').config()

// const db = mysql.createConnection({
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_DATABASE
// })

// db.connect((err)=>{
//     if(err) return console.log("Database not connected",err)
//       return console.log("DB connected Successfully")
// })

// module.exports = db

const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
);

sequelize.authenticate().then(()=>{
     console.log('DB connected Successfully')
}).catch((err)=>console.log("DB not connected",err))


module.exports = sequelize;
