import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({
  name,
  placeholder,
  type,
  label,
  error,
  classname,
  value,
  onChange
}) => (
  <div className="form-group">
    <input
      className={classnames('form-control form-control-lg', {
        'is-invalid': error
      })}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default TextFieldGroup;
