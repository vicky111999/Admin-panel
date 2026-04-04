'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await  queryInterface.createTable('users',{
      id:{
        type:Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey:true,
      },
      name:{
        type:Sequelize.STRING(255),
        allowNull:false,

      },
      email:{
        type:Sequelize.STRING(255),
        allowNull:false,
        unique:true,
      },
      password:{
        type:Sequelize.STRING(255),
        allowNull:false,
      },
      roleid:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      verify_otp:{
        type:Sequelize.STRING(255),
        defaultValue:'',
      },
      verify_otp_expiry:{
        type:Sequelize.INTEGER,
        defaultValue:null,
      },
      created_at:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
};
