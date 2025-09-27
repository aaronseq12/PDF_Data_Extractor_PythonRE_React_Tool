import React from 'react';

const Button = ({ onClick, children, className, disabled = false, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`primary-button ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
