import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProfile } from '../../actions/profileActions';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getMyProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboard;
    if (profile === null || loading === true) {
      dashboard = <p>Dashboard Loading</p>;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboard = <p>This is your profile</p>;
      } else {
        dashboard = (
          <div>
            <p>Oh no! You do not have a profile yet!</p>
            <Link to="create-profile">Create Profile</Link>
          </div>
        );
      }
    }

    return (
      <div>
        <h1>Welcome {user.name}</h1>
        {dashboard}
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getMyProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getMyProfile })(Dashboard);
