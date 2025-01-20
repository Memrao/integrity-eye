'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ActivityLogs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      activityDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "A brief description of the suspicious activity",
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: "The timestamp of when the suspicious activity was detected",
      },
      actionsTaken: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Actions taken in response to the incident",
      },
      classroomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Classrooms', // Assuming there's a Classrooms table
          key: 'id',
        },
        onDelete: 'CASCADE',
        comment: "The classroom where the suspicious activity occurred",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: "Record creation time",
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: "Record update time",
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ActivityLogs');
  }
};
