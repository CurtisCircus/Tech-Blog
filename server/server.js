const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ... Other imports and configurations

// Use your routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

app.use('/', indexRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
