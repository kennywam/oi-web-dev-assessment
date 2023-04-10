const helmet = require("helmet");
const cors = require("cors");

// Enable CORS for cross-origin resource sharing
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Configure security headers using Helmet
const securityMiddleware = (app) => {
  app.use(helmet());
  app.use(cors(corsOptions));
};

module.exports = securityMiddleware;
