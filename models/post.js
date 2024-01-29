const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Post = sequelize.define(
    'Post',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contents: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  // Define associations
  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Post.hasMany(models.Comment, {
      foreignKey: 'postId',
      onDelete: 'CASCADE',
    });
  };

  return Post;
};
