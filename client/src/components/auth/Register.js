import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);

    e.preventDefault();
  }

  render() {
    return (
      <div className="Register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign UP</h1>
              <p className="lead text-center">Create Your Account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    name="name"
                    value={this.state.name}
                    placeholder="Name"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    name="email"
                    value={this.state.email}
                    placeholder="Email Address"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    name="password"
                    value={this.state.password}
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    name="password2"
                    value={this.state.password2}
                    placeholder="Confirm Password"
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-info btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
