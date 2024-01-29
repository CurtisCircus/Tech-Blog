const Post = require('../models/post');

// Display the homepage
exports.getHomePage = async (req, res) => {
  try {
    const posts = await Post.findAll(); // Fetch all blog posts from the database
    res.render('home', { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
