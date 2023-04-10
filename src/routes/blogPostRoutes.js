const express = require("express");
const router = express.Router();
const blogPostController = require("../controllers/blogPostController");

// GET all blog posts
router.get("/", blogPostController.getAllBlogPosts);

// GET a blog post by ID
router.get("/:id", blogPostController.getBlogPostById);

// CREATE a new blog post
router.post("/", blogPostController.createBlogPost);

// UPDATE a blog post by ID
router.put("/:id", blogPostController.updateBlogPostById);

// DELETE a blog post by ID
router.delete("/:id", blogPostController.deleteBlogPostById);

module.exports = router;
