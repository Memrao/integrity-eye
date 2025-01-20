const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const ActivityLog = sequelize.define('ActivityLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users', // Foreign key to users table
      key: 'id',
    },
  },
  activityType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'activity_logs', // Table name
  timestamps: false,
});

module.exports = ActivityLog;
