'use strict';

const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const hashedpassword = await bcrypt.hash(process.env.ADMIN_PASS,10)

   await queryInterface.bulkInsert('users',[
    {
      name:'SuperAdmin',
      email:'superadmin@gmail.com',
      password:hashedpassword,
      roleid:1,
      verify_otp:'',
      verify_otp_expiry:null,
      created_at:new Date(),
      updated_at:new Date()
    },
     {
      name:'Admin',
      email:'admin@gmail.com',
      password:hashedpassword,
      roleid:2,
      verify_otp:'',
      verify_otp_expiry:null,
      
    }
   ]) 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users',{
      email:['superadmin@gmail.com','admin@gmail.com']
    })
  }
};
