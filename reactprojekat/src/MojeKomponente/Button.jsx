import React from 'react';
import './Button.css';

const Button = ({ text, onClick, type = "button", styleType = "primary" }) => {
  return (
    <button className={`btn ${styleType}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;
