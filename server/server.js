require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

// Use your routes
const indexRoutes = require('../routes/index');
const authRoutes = require('../routes/auth');

// Use a Sequelize session store for persistent sessions
const sequelize = require('./path/to/your/sequelize-instance'); // Import your Sequelize instance
const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: 'your-secret-key', // Change this to a strong, unique secret
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Set the session to expire after 1 day (adjust as needed)
    },
  })
);

app.use('/', indexRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
