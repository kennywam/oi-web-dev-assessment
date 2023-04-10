import React from "react";
import PropTypes from "prop-types";

const CategoryTable = ({ categories, onDelete }) => {
  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      onDelete(categoryId);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Category Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.name}</td>
            <td>
              <button onClick={() => handleDelete(category.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

CategoryTable.propTypes = {
  categories: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CategoryTable;
