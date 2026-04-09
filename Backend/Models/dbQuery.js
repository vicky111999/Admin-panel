
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
    },
    verify_otp_expiry: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    deleted:{
      type:DataTypes.INTEGER(1),
      defaultValue:0,
      validate:{
        isIn:{
          args:[[0,1]],
          msg:'Only allow 0 and 1'
        }
      }
    },
    deleted_by:{
        type:DataTypes.INTEGER,    
    },
    deleted_at:{
      type:DataTypes.DATE
    }
  },
  { tableName: "users",paranoid:true,deletedAt:'deleted_at',timestamps: false },
);

module.exports = User;
