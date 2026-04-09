'use strict';

const sequelize = require('../Config/DB');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('users','deleted',{
      type:Sequelize.TINYINT,
      defaultValue:0,
      allowNull:false
   })
   await queryInterface.addColumn('users','deleted_by',{
      type:Sequelize.BIGINT,
      allowNull:true,
   })
   await queryInterface.addColumn('users','deleted_at',{
    type:Sequelize.DATE,
    allowNull:true
   })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn('users','deleted')
   await queryInterface.removeColumn('users','deleted_by')
   await queryInterface.removeColumn('users','deleted_at')
  }
};
