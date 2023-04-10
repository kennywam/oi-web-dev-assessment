import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const PostForm = () => {
  const { postId } = useParams();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Fetch post data for editing
    const fetchPost = async () => {
      if (postId) {
        try {
          const response = await axios.get(`/api/posts/${postId}`);
          const { title, content, category, tags } = response.data;
          setTitle(title);
          setContent(content);
          setCategory(category);
          setTags(tags);
        } catch (error) {
          console.error(`Failed to fetch post with ID ${postId}:`, error);
        }
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      category,
      tags,
    };

    try {
      if (postId) {
        // Update existing post
        await axios.put(`/api/posts/${postId}`, postData);
      } else {
        // Create new post
        await axios.post("/api/posts", postData);
      }

      // Redirect to admin dashboard
      history.push("/admin");
    } catch (error) {
      console.error("Failed to submit post:", error);
    }
  };

  return (
    <div>
      <h1>{postId ? "Edit Post" : "Create Post"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </label>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label>
          Tags (separated by commas):
          <input
            type="text"
            value={tags.join(", ")}
            onChange={(e) => setTags(e.target.value.split(", "))}
          />
        </label>
        <button type="submit">{postId ? "Save" : "Create"}</button>
      </form>
    </div>
  );
};

export default PostForm;
