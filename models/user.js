const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Define associations (if any)
  User.associate = (models) => {
    // Example association: User has many Posts
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return User;
};