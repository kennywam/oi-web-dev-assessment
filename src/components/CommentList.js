import React from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    // Fetch comments for the blog post
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments?postId=${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleDelete = async (commentId) => {
    try {
      // Delete comment
      await axios.delete(`/api/comments/${commentId}`);
      // Fetch updated comments for the blog post
      // You can choose to update the comments state or refetch comments using useEffect
      const response = await axios.get(`/api/comments?postId=${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <strong>{comment.author}</strong>: {comment.content}
              {/* Add a delete button for each comment */}
              <button
                onClick={() => handleDelete(comment._id)}
                style={{ marginLeft: "1rem" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
