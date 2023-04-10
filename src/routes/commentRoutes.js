const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// GET all comments for a blog post
router.get('/blog-posts/:postId/comments', commentController.getAllCommentsForBlogPost);

// GET a comment by ID
router.get('/:id', commentController.getCommentById);

// CREATE a new comment for a blog post
router.post('/blog-posts/:postId/comments', commentController.createCommentForBlogPost);

// UPDATE a comment by ID
router.put('/:id', commentController.updateCommentById);

// DELETE a comment by ID
router.delete('/:id', commentController.deleteCommentById);

module.exports = router;
