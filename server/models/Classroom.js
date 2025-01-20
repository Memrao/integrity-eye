const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Classroom = sequelize.define('Classroom', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'classrooms', // Table name
  timestamps: true,
});

module.exports = Classroom;
