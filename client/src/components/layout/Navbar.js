import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import logo from './brand-white.png';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.mobileMenuActive = this.mobileMenuActive.bind(this);
  }

  onLogoutClick(e) {
    this.props.logoutUser();
    e.preventDefault();
  }

  mobileMenuActive() {
    this.setState({ active: !this.state.active });
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const loggedOutLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    const loggedInLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/dashboard"
            onClick={this.onLogoutClick.bind(this)}
          >
            Logout
          </Link>
        </li>
      </ul>
    );

    const mobileLinks = (
      <ul className="mobile text-white">
        <li>Register</li>
        <li>Login</li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container container-header flex">
            <Link className="navbar-brand" to="/">
              <img className="logo" src={logo} alt="logo" />
            </Link>
            {isAuthenticated ? loggedInLinks : loggedOutLinks}
            <div
              className={
                this.state.active ? 'mobile-menu active' : 'mobile-menu'
              }
              onClick={this.mobileMenuActive}
            >
              <div className="bar bar1" />
              <div className="bar bar2" />
              <div className="bar bar3" />
            </div>
          </div>
        </nav>
        <div className="mobile-nav bg-primary">
          {this.state.active && mobileLinks}
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
