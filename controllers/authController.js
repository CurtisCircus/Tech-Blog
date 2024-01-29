const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/user');

// Display the login form
exports.getLogin = (req, res) => {
  // Check if the user is already logged in
  if (req.session.user) {
    return res.redirect('/dashboard');
  }

  res.render('login'); // Render the login.handlebars template
};

// Handle login form submission
exports.postLogin = async (req, res) => {
  // Check if the user is already logged in
  if (req.session.user) {
    return res.redirect('/dashboard');
  }

  // Validate the login form data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('login', {
      errorMessage: 'Invalid username or password',
    });
  }

  const { username, password } = req.body;

  try {
    // Find the user by username in the database
    const user = await User.findOne({ where: { username } });

    // Check if the user exists
    if (!user) {
      return res.status(401).render('login', {
        errorMessage: 'Invalid username or password',
      });
    }

    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Successful login
      req.session.user = user; // Store user information in the session
      return res.redirect('/dashboard'); // Redirect to the dashboard
    } else {
      return res.status(401).render('login', {
        errorMessage: 'Invalid username or password',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Display the sign-up form
exports.getSignup = (req, res) => {
  res.render('signup');
};

// Handle sign-up form submission
exports.postSignup = async (req, res) => {
  // Validation logic (if needed)

  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    // Automatically log in the user after successful sign-up
    req.session.user = newUser;

    // Redirect to the dashboard or homepage after successful sign-up
    res.redirect('/dashboard'); // Change this to your desired post-signup destination
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Handle logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

// Display the dashboard
exports.getDashboard = (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.redirect('/login'); // Redirect to login if not logged in
  }

  // Render the dashboard template
  res.render('dashboard');
};
