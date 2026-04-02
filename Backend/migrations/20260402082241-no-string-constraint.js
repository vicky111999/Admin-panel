'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('users',{
      fields:['name','email','password','roleid'],
      type:'check',
      name:'name_email_password_roleid_not_empty',
      where:{
        name:{
          [Sequelize.Op.ne] : '',
        },
        email:{
          [Sequelize.Op.ne] : '',
        },
        password:{
          [Sequelize.Op.ne]:'',
        },
        roleid:{
          [Sequelize.Op.ne] : '',
        }
      }
    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeConstraint('users','name_email_password_roleid_not_empty')
  }
};
