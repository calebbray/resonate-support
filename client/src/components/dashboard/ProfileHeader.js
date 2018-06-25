import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props.profile;
    return (
      <div className="profile-header card bg-primary">
        <div className="container">
          <ul className="profile-info">
            <li>{profile.user.name}</li>
            <li>{profile.site}</li>
            <li>{profile.support_goal}</li>
            <li>
              <Link to="/edit-profile" className="text-white">
                Edit Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(ProfileHeader);
