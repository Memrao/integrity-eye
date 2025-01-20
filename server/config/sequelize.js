const { Sequelize } = require('sequelize');
const dbConfig = require('./config');

// Sequelize instance
const sequelize = new Sequelize(dbConfig.development);

// Test the connection
async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, connectToDatabase };
