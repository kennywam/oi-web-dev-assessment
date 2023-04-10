import React from "react";

const PostTable = ({ posts, editPost, deletePost }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Post Name</th>
          <th>Content</th>
          <th>Category</th>
          <th>Tags</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td>{post.name}</td>
            <td>{post.content}</td>
            <td>{post.category}</td>
            <td>{post.tags.join(",")}</td>
            <td>
              <button onClick={() => editPost(post)}>Edit</button>
              <button onClick={() => deletePost(post)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostTable;
