import React, { useState, useEffect } from "react";
import axios from "axios";

const PostForm = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    // Fetch categories and tags from backend API
    const fetchCategoriesAndTags = async () => {
      try {
        const categoriesResponse = await axios.get("/api/categories");
        const tagsResponse = await axios.get("/api/tags");
        setCategories(categoriesResponse.data);
        setTags(tagsResponse.data);
      } catch (error) {
        console.error("Error fetching categories and tags:", error);
      }
    };
    fetchCategoriesAndTags();
  }, []);

  const handlePostFormSubmit = (formData) => {
    // Submit post form data to backend API
    // Include selected category and tag IDs in the formData
    // for creating or updating the post
    const { categoryId, tagIds, ...postFormData } = formData;
    const selectedCategory = categories.find(
      (category) => category.id === categoryId
    );
    const selectedTags = tags.filter((tag) => tagIds.includes(tag.id));
    const postData = {
      ...postFormData,
      category: selectedCategory,
      tags: selectedTags,
    };
    // Make API call to create or update post with formData
    // including selected category and tag IDs
    axios
      .post("/api/posts", postData)
      .then((response) => {
        // Handle successful post creation or update
        console.log("Post created or updated successfully:", response.data);
      })
      .catch((error) => {
        // Handle post creation or update error
        console.error("Error creating or updating post:", error);
      });
  };

  return (
    <div>
      {/* Render post form with category and tag dropdown */}
      <form onSubmit={handlePostFormSubmit}>
        {/ Render post form inputs /}
        {/ ... /}
        {/ Render category dropdown /}
        <label htmlFor="categoryId">Category:</label>
        <select id="categoryId" name="categoryId">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {/ Render tag multi-select dropdown */}
        <label htmlFor="tagIds">Tags:</label>
        <select id="tagIds" name="tagIds" multiple>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
