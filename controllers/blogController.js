const Post = require('../models/post');

// Display the homepage
exports.getHomePage = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ['title', 'createdAt'], // Include only title and creation date
      order: [['createdAt', 'DESC']], // Order by creation date in descending order
    });

    res.render('home', { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
