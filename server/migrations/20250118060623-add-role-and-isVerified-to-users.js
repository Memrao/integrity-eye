'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Adding 'role' and 'isVerified' columns to the 'Users' table
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      defaultValue: 'user', // Default value for role is 'user'
      allowNull: false,
    });
    await queryInterface.addColumn('Users', 'isVerified', {
      type: Sequelize.BOOLEAN,
      defaultValue: false, // Default value for isVerified is false
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    // Reverting the changes (removing 'role' and 'isVerified' columns)
    await queryInterface.removeColumn('Users', 'role');
    await queryInterface.removeColumn('Users', 'isVerified');
  }
};
