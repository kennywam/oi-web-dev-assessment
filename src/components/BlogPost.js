import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, searchPosts } from "../redux/actions/postsActions"; // Import fetchPosts and searchPosts actions from redux/actions/postsActions

const BlogPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query

  useEffect(() => {
    dispatch(fetchPosts()); // Fetch blog posts from backend API
  }, [dispatch]);

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle search form submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    dispatch(searchPosts(searchQuery)); // Dispatch searchPosts action with search query
  };

  return (
    <div>
      <h1>Blog Posts</h1>

      {/* Render search form */}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by title or content"
        />
        <button type="submit">Search</button>
      </form>

      {/* Render the blog posts */}
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {/* Render other blog post details */}
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
