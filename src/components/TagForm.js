import React, { useState } from "react";
import PropTypes from "prop-types";

const TagForm = ({ onSubmit }) => {
  const [tagName, setTagName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!tagName.trim()) {
      setError("Tag name cannot be empty");
      return;
    }

    onSubmit(tagName);
    setTagName("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tag name"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
      />
      <button type="submit">Add Tag</button>
      {error && <p>{error}</p>}
    </form>
  );
};

TagForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TagForm;
