import React from 'react';

const Input = ({ name, label, value, error, onChange, type }) => {
  return (
    <div className='mb-3'>
      <label htmlFor={name} className='form-label'>
        {label}
      </label>
      <input
        onChange={onChange}
        value={value}
        name={name}
        type={type}
        className='form-control'
        id={name}
      />
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default Input;
