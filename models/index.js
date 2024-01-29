const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT, // Make sure to include the dialect in your environment variables
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT, // Specify the dialect here
  port: DB_PORT,
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  },
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
