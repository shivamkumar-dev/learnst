import React from 'react';

const Select = ({ name, label, items, onChange, error }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} className='form-select' onChange={onChange}>
        <option value='' />
        {items.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default Select;
