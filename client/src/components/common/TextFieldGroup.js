import React from 'react';

const TextFieldGroup = ({
  name,
  placeholder,
  type,
  label,
  error,
  classname,
  value,
  onChange
}) => {
  return (
    <div className="form-group">
      <input
        className="form-control form-control-lg"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TextFieldGroup;
