const isAuthenticated = (req, res, next) => {
  // Check if the user is authenticated
  // ...

  if (authenticated) {
    // User is authenticated, proceed to the next middleware
    next();
  } else {
    // User is not authenticated, send an error response
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  isAuthenticated,
};
