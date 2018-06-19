import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props.profile;
    return (
      <div className="profile-header bg-primary">
        <div className="container">
          <div className="row">
            <ul>
              <li>{profile.user.name}</li>
              <li>{profile.site}</li>
              <li>{profile.support_goal}</li>
            </ul>
          </div>
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
