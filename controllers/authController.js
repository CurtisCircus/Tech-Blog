const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/user');

// Display the login form
exports.getLogin = (req, res) => {
  res.render('login'); // Render the login.handlebars template
};

// Handle login form submission
exports.postLogin = async (req, res) => {
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

    await User.create({
      username,
      password: hashedPassword,
    });

    // Redirect to the homepage or dashboard after successful sign-up
    res.redirect('/');
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
