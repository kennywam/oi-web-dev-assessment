const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { verifyToken } = require("./middlewares/auth"); // Assuming you have a middleware for token verification

// GET route to fetch all comments for admin dashboard
router.get("/comments", verifyToken, async (req, res) => {
  try {
    const db = req.app.locals.db; // Assuming you have set up MongoDB connection and made it available in app.locals
    const postsCollection = db.collection("posts");
    const comments = await postsCollection
      .aggregate([
        { $unwind: "$comments" },
        { $sort: { "comments.createdAt": -1 } }, // Sort comments by createdAt in descending order
        {
          $project: {
            "comments._id": 1,
            "comments.content": 1,
            "comments.status": 1,
          },
        }, // Project only required fields
      ])
      .toArray();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT route to update comment approval status
router.put("/comments/:id", verifyToken, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const postsCollection = db.collection("posts");
    const commentId = req.params.id;
    const updatedComment = req.body;
    const result = await postsCollection.updateOne(
      { "comments._id": ObjectId(commentId) },
      { $set: { "comments.$.status": updatedComment.status } }
    );
    if (result.modifiedCount === 1) {
      res.json({ message: "Comment status updated successfully" });
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE route to delete a comment
router.delete("/comments/:id", verifyToken, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const postsCollection = db.collection("posts");
    const commentId = req.params.id;
    const result = await postsCollection.updateOne(
      {},
      { $pull: { comments: { _id: ObjectId(commentId) } } }
    );
    if (result.modifiedCount === 1) {
      res.json({ message: "Comment deleted successfully" });
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


