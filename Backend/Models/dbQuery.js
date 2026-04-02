// const db = require("../Config/DB");

// const usertable=(callback)=>{
//     const sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,roleid INT NOT NULL,name VARCHAR(100) NOT NULL CHECK (name <> ''),email VARCHAR(255) UNIQUE NOT NULL CHECK (email <> ''),password VARCHAR(255) NOT NULL CHECK (password <> ''),verify_otp VARCHAR(255) NOT NULL,verify_otp_expiry VARCHAR(255) NOT NULL)"
//     db.query(sql,callback)
// }

// module.exports = { usertable };

const { DataTypes } = require("sequelize");
const sequelize = require("../Config/DB");

const User = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    roleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    verify_otp: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    verify_otp_expiry: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "users", timestamps: false },
);

module.exports = User;
