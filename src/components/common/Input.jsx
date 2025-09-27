import React from 'react';

const Input = ({ type, placeholder, value, onChange, required = false }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="input-field"
    />
  );
};

export default Input;
