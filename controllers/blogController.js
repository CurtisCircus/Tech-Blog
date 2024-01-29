const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

// Display details of a specific blog post
exports.getBlogPostDetails = async (req, res) => {
  const postId = req.params.id; // Assuming your route has a parameter for post ID

  try {
    // Find the selected blog post by ID
    const post = await Post.findByPk(postId, {
      include: [
        // Include the associated user (assuming you have a User model)
        { model: User, attributes: ['username'] },
        // Include comments associated with the post
        { model: Comment, attributes: ['content', 'createdAt'], include: [User] },
      ],
    });

    if (!post) {
      // Handle the case where the post with the given ID is not found
      return res.status(404).send('Post not found');
    }

    // Render the 'post.handlebars' template with the post details
    res.render('post', { post });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Handle comment form submission
exports.postComment = async (req, res) => {
  const { content, postId } = req.body;

  try {
    // Create a new comment in the database
    const newComment = await Comment.create({
      content,
      postId,
      userId: req.session.user.id, // Assuming you store user information in the session
    });

    // Redirect back to the post details page after comment submission
    res.redirect(`/posts/${postId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Display the homepage with a list of blog posts
exports.getHomePage = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ['title', 'createdAt'], // Include only title and creation date
      order: [['createdAt', 'DESC']], // Order by creation date in descending order
    });

    res.render('blog', { posts }); // Assuming you renamed 'home' to 'blog'
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
