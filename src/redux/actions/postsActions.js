import axios from "axios";
import { FETCH_POSTS_SUCCESS, SEARCH_POSTS_SUCCESS } from "../types/postsTypes"; // Import action types

// Action to fetch blog posts from backend API
export const fetchPosts = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/posts"); // Update the API endpoint to match your backend API route for fetching posts
    dispatch({ type: FETCH_POSTS_SUCCESS, payload: response.data }); // Dispatch success action with fetched posts data
  } catch (error) {
    console.error(error);
    // Handle error and dispatch failure action if necessary
  }
};

// Action to search blog posts by title or content
export const searchPosts = (query) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/posts/search?q=${query}`); // Update the API endpoint to match your backend API route for searching posts and pass the query as a query parameter
    dispatch({ type: SEARCH_POSTS_SUCCESS, payload: response.data }); // Dispatch success action with searched posts data
  } catch (error) {
    console.error(error);
    // Handle error and dispatch failure action if necessary
  }
};
