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

// Display the dashboard with user's blog posts
exports.getDashboard = async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.user) {
      return res.redirect('/login'); // Redirect to login if not logged in
    }

    // Fetch the user's blog posts
    const userId = req.session.user.id;
    const userPosts = await Post.findAll({
      where: { userId }, // Assuming your Post model has a userId column
      attributes: ['id', 'title', 'createdAt'], // Include post details
      order: [['createdAt', 'DESC']], // Order by creation date in descending order
    });

    // Render the 'dashboard.handlebars' template with the user's posts
    res.render('dashboard', { userPosts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Display the homepage with a list of all blog posts
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

// Display the form for creating a new blog post
exports.getCreatePost = (req, res) => {
  res.render('createPost');
};

// Handle the submission of the new blog post form
exports.postCreatePost = async (req, res) => {
  const { title, contents } = req.body;

  try {
    // Create a new blog post in the database
    await Post.create({
      title,
      contents,
      userId: req.session.user.id, // Assuming you store user information in the session
    });

    // Redirect to the dashboard or homepage after successful post creation
    res.redirect('/dashboard'); // Change this to your desired post-creation destination
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};