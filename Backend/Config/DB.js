
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
