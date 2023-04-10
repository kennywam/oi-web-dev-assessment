const jwt = require('jsonwebtoken');

// Middleware to authenticate and authorize users
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateUser;
