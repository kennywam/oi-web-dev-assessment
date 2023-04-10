import React, { useState } from "react";
import axios from "axios";

const CommentForm = ({ postId }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!author || !content) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Create a new comment
      await axios.post("/api/comments", { postId, author, content });
      // Reset form values and error state
      setAuthor("");
      setContent("");
      setError("");
      // Fetch updated comments for the blog post
      // You can choose to update the comments state or refetch comments using useEffect in the CommentList component
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  return (
    <div>
      <h3>Add Comment</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CommentForm;
