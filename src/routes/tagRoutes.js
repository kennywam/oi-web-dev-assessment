const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");

// GET all tags
router.get("/", tagController.getAllTags);

// GET a tag by ID
router.get("/:id", tagController.getTagById);

// CREATE a new tag
router.post("/", tagController.createTag);

// UPDATE a tag by ID
router.put("/:id", tagController.updateTagById);

// DELETE a tag by ID
router.delete("/:id", tagController.deleteTagById);

module.exports = router;
