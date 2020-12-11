import React from 'react';

const Dropdown = ({ title, items, onItemSelect }) => {
  return (
    <div className='col-3'>
      <select
        className='form-select btn-secondary'
        onChange={(event) => onItemSelect(event)}
      >
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

export default Dropdown;
