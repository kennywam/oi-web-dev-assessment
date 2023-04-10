import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import PostTable from "./PostTable";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [postToEdit, setPostToEdit] = useState(null);

  // Fetch posts from backend API on component mount
  useEffect(() => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  // Function to create a new post
  const createPost = (post) => {
    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts([...posts, data]);
      })
      .catch((error) => console.error("Error creating post:", error));
  };

  // Function to update an existing post
  const updatePost = (post) => {
    fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(posts.map((p) => (p.id === data.id ? data : p)));
        setPostToEdit(null);
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  // Function to delete a post
  const deletePost = (post) => {
    fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setPosts(posts.filter((p) => p.id !== post.id));
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  // Function to edit a post
  const editPost = (post) => {
    setPostToEdit(post);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Posts</h2>
      <PostForm
        createPost={createPost}
        updatePost={updatePost}
        postToEdit={postToEdit}
      />
      <PostTable posts={posts} editPost={editPost} deletePost={deletePost} />
    </div>
  );
};

export default AdminDashboard;
