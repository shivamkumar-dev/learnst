import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ title, items, onItemSelect }) => {
  return (
    <div className='col-3'>
      <select className='form-select' onChange={(event) => onItemSelect(event)}>
        <option defaultValue>{title}</option>
        {items.map((item) => (
          <option key={item._id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onItemSelect: PropTypes.func.isRequired,
};

export default Dropdown;
