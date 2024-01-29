function isAuthenticated(req, res, next) {
    if (req.session.user) {
      // If the user is authenticated, proceed to the next middleware or route handler
      return next();
    } else {
      // If the user is not authenticated, redirect to the login page
      return res.redirect('/login');
    }
  }
  
  module.exports = {
    isAuthenticated,
  };