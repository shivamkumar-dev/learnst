import React from 'react';

const AnswerSelect = ({ name, label, items, onChange }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} className='form-select' onChange={onChange}>
        <option value='' />
        {items.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AnswerSelect;
