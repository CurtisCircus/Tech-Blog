const Post = require('../models/post');

exports.getHomePage = async (req, res) => {
  try {
    const posts = await Post.findAll(); // Fetch all blog posts from the database
    // Render the homepage with existing blog posts
    res.render('home', { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
