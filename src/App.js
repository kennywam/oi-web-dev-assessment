// Import required dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/config");
const blogPostRoutes = require("./routes/blogPostRoutes");
const commentRoutes = require("./routes/commentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const tagRoutes = require("./routes/tagRoutes");
const authRoutes = require("./routes/authRoutes");
const inputValidation = require("./middlewares/inputValidation");
const errorHandler = require("./middlewares/errorHandler");
const authMiddleware = require("./middlewares/authMiddleware");
const authorizationMiddleware = require("./middlewares/authorizationMiddleware");
const securityMiddleware = require("./middlewares/securityMiddleware");
const loggingMiddleware = require("./middlewares/loggingMiddleware");
const blogPostModel = require("./models/blogPostModel");
const commentModel = require("./models/commentModel");
const categoryModel = require("./models/categoryModel");
const tagModel = require("./models/tagModel");

// Import frontend components
const AdminDashboard = require("./components/AdminDashboard");
const Blogpost = require("./components/BlogPost");
const CategoryForm = require("./components/CategoryForm");
const CategoryTable = require("./components/CategoryTable");
const CommentForm = require("./components/CommentForm");
const CommentList = require("./components/CommentList");
const PostDetails = require("./components/PostDetails");
const PostForm = require("./components/PostForm");
const PostList = require("./components/PostList");
const PostTable = require("./components/PostTable");
const SearchBar = require("./components/SearchBar");
const TagForm = require("./components/TagForm");
const TagTable = require("./components/TagTable");

// Connect to MongoDB using Mongoose
mongoose
  .connect(config.mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

// Create Express app
const app = express();

// Middleware for parsing request body
app.use(bodyParser.json());

// Middleware for input validation
app.use(inputValidation);

// Middleware for authentication
app.use(authMiddleware);

// Middleware for authorization
app.use(authorizationMiddleware);

// Middleware for security headers and CORS
securityMiddleware(app);

// Middleware for logging
loggingMiddleware(app);

// Route for handling blog post requests
app.use("/api/blogposts", blogPostRoutes);

// Route for handling comment requests
app.use("/api/comments", commentRoutes);

// Route for handling category requests
app.use("/api/categories", categoryRoutes);

// Route for handling tag requests
app.use("/api/tags", tagRoutes);

// Route for handling authentication requests
app.use("/api/auth", authRoutes);

// Error handler middleware
app.use(errorHandler);

// Serve frontend components
app.use("/admin/dashboard", AdminDashboard);
app.use("/blogpost", Blogpost);
app.use("/category/form", CategoryForm);
app.use("/category/table", CategoryTable);
app.use("/comment/form", CommentForm);
app.use("/comment/list", CommentList);
app.use("/post/details", PostDetails);
app.use("/post/form", PostForm);
app.use("/post/list", PostList);
app.use("/post/table", PostTable);
app.use("/search", SearchBar);
app.use("/tag/form", TagForm);
app.use("/tag/table", TagTable);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
