const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// GET all categories
router.get("/", categoryController.getAllCategories);

// GET a category by ID
router.get("/:id", categoryController.getCategoryById);

// CREATE a new category
router.post("/", categoryController.createCategory);

// UPDATE a category by ID
router.put("/:id", categoryController.updateCategoryById);

// DELETE a category by ID
router.delete("/:id", categoryController.deleteCategoryById);

module.exports = router;
