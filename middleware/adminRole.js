module.exports = (req, res, next) => {
  // At this point the token has been verified AND
  // the jwt payload should be in the req.user property

  if (!req.user) {
    res.status(401).send("User is not authenticated");
  }

  if (req.user.role === "admin") {
    next(); // pass the request to the main handler
  } else {
    res.status(401).send("Unauthorized Access");
  }
}