const { DataTypes } = require('sequelize');
const sequelize = require('./index');  // Remove this line
const User = require('./user');
const Post = require('./post');

const Comment = sequelize.define(
  'Comment',
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {}
);

// Define associations
Comment.belongsTo(User);
Comment.belongsTo(Post);

module.exports = Comment;
