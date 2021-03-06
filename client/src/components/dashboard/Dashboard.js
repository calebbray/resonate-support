import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProfile } from '../../actions/profileActions';
import { Link } from 'react-router-dom';
import Loader from '../common/Loader';
import ProfileHeader from './ProfileHeader';
import SupporterList from './SupporterList';
import SupportData from './SupportData';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getMyProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const name = user.name.trim().split(' ')[0];

    let dashboard;
    if (profile === null || loading === true) {
      dashboard = <Loader />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboard = (
          <div>
            <div className="flexbox">
              <ProfileHeader />
              <SupportData />
            </div>
            <SupporterList />
          </div>
        );
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
        <div>
          <h1>Welcome {name}</h1>
          {user.isAdmin && (
            <Link className="btn btn-info" to="/admin/profiles">
              Admin Tools
            </Link>
          )}
        </div>
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

export default connect(
  mapStateToProps,
  { getMyProfile }
)(Dashboard);
