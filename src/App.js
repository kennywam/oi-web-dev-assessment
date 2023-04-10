// Import required dependencies
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config");

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

// Create Express app
const app = express();

// Middleware for parsing request body
app.use(bodyParser.json());

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
