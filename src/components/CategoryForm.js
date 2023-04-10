import React, { useState } from "react";
import PropTypes from "prop-types";

const CategoryForm = ({ onSubmit }) => {
  const [categoryName, setCategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim() === "") {
      setErrorMessage("Category name is required");
      return;
    }
    onSubmit(categoryName);
    setCategoryName("");
    setErrorMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Category name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <button type="submit">Add Category</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
};

CategoryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CategoryForm;
