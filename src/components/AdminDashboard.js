import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch blog posts from API
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

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      // Update state to remove deleted post
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error(`Failed to delete post with ID ${postId}:`, error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/admin/posts/new">Create New Post</Link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>{post.category}</td>
              <td>{post.tags.join(", ")}</td>
              <td>
                <Link to={`/admin/posts/${post._id}`}>Edit</Link>
                <button onClick={() => handleDeletePost(post._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
