import React from 'react';
import './InputField.css';

const InputField = ({ label, type, value, onChange, placeholder, name }) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name} 
      />
    </div>
  );
};

export default InputField;
