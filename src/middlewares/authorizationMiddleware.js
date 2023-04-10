const jwt = require("jsonwebtoken");
const config = require("config");

// Middleware function to handle authorization
const authorizationMiddleware = (req, res, next) => {
  // Get token from request headers
  const token = req.header("x-auth-token");

  // Check if token exists
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Authorization denied. No token provided." });
  }

  try {
    // Verify and decode token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // Set decoded user object to request object for further use
    req.user = decoded.user;

    // Call next middleware
    next();
  } catch (err) {
    // Token is not valid
    return res
      .status(401)
      .json({ msg: "Authorization denied. Invalid token." });
  }
};

module.exports = authorizationMiddleware;
