import React from 'react';
import PropTypes from 'prop-types';

const TagTable = ({ tags, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Tag Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tags.map((tag) => (
          <tr key={tag.id}>
            <td>{tag.name}</td>
            <td>
              <button onClick={() => onDelete(tag.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TagTable.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TagTable;
