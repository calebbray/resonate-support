import React, { Component } from 'react';
import classnames from 'classnames';

class NumericFieldGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    let re = /^\$?(\d{1,4})\.?(0{2})?$/;
    if (this.validateIsNumber(re, e)) {
      this.setState({ value: e.target.value });
    }
    e.preventDefault();
  }

  validateIsNumber(re, e) {
    re.test(e.target.value) ? true : false;
  }

  render() {
    const { name, placeholder, error } = this.props;

    return (
      <div className="form-group">
        <input
          className={classnames('form-control form-control-lg', {
            'is-invalid': error
          })}
          type="text"
          name={name}
          value={this.state.value}
          placeholder={placeholder}
          onChange={this.onChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
}

export default NumericFieldGroup;
