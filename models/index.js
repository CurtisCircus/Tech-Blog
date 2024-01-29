const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const Sequelize = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql', // Adjust the dialect based on your database
});

const models = {
  User: sequelize.define('User', { /* ... */ }),
  Post: sequelize.define('Post', { /* ... */ }),
  Comment: sequelize.define('Comment', { /* ... */ }),
  // Add other models here
};

// Define associations
Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

// Export models and sequelize instance
module.exports = { sequelize, ...models };