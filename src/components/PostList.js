import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch all posts
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/admin/new">Create New Post</Link>
    </div>
  );
};

export default PostList;
