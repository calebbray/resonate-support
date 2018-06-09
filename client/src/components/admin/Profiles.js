import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profileActions';
import { Link } from 'react-router-dom';
import Loader from '../common/Loader';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;

    let staffProfiles;

    if (profiles === null || loading) {
      staffProfiles = null;
    } else {
      if (profiles.length > 0) {
        staffProfiles = profiles.map(profile => (
          <tr key={profile._id}>
            <td>{profile.user.name}</td>
            <td>{profile.site}</td>
            <td>{profile.support_goal}</td>
            <td>
              <Link to={`/admin/profiles/user/${profile.user._id}`}>
                View Profile
              </Link>
            </td>
          </tr>
        ));
      } else {
        staffProfiles = <h4>No Profiles Found</h4>;
      }
    }

    return (
      <div>
        <h1>Resonate Staff Profiles</h1>
        {!loading ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Site</th>
                <th>Support Goal</th>
                <th />
              </tr>
            </thead>
            <tbody>{staffProfiles}</tbody>
          </table>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
