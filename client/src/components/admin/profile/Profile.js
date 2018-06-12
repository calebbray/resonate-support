import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfileById } from '../../../actions/profileActions';
import PropTypes from 'prop-types';
import Loader from '../../common/Loader';
import ProfileSupporters from '../profile/ProfileSupporters';
import ProfileSupport from '../profile/ProfileSupport';

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProfileById(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === {}) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Loader />;
    } else {
      profileContent = (
        <div>
          <h1>{profile.user.name}</h1>
          <ProfileSupporters />
          <hr />
          <ProfileSupport />
        </div>
      );
    }

    return profileContent;
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
