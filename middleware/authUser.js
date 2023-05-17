const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Read the Authorization header of the request
  // Authorization: <type> <token>
  // Authorization: Bearer <jwt>

  const authHeader = req.header("authorization");

  if (!authHeader) {
    res.status(401).send("Access denied. No authorization token provided.");
  }

  const authArray = authHeader.split(" ");

  if (!authHeader[1]) {
    res.status(401).send("Access denied. No authorization token provided.");
  }

  const token = authArray[1];

  try {
    const payLoad = jwt.verify(token, process.env.JWT_KEY);
    req.user = payLoad;
    next();
  } catch {
    res.status(401).send("Access denied. Invalid token");
  }
}