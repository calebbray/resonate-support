import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile, getMyProfile } from '../../../actions/profileActions';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../../validation/is-empty';
import TextFieldGroup from '../../common/TextFieldGroup';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      site: '',
      support_goal: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getMyProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      profile.site = !isEmpty(profile.site) ? profile.site : '';
      profile.support_goal = !isEmpty(profile.support_goal)
        ? profile.support_goal
        : '';

      this.setState({
        site: profile.site,
        support_goal: profile.support_goal
      });
    }
  }

  onSubmit(e) {
    const { site, support_goal } = this.state;
    const updateProfile = {
      site,
      support_goal
    };

    this.props.createProfile(updateProfile, this.props.history);
    e.preventDefault();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="edit-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Profile</h1>
              <p className="lead text-center">
                Edit your staff site and support goal
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  name="site"
                  placeholder="Resonate Church Site"
                  value={this.state.site}
                  onChange={this.onChange}
                  error={errors.site}
                />
                <TextFieldGroup
                  type="text"
                  name="support_goal"
                  placeholder="Monthly Support Raising Goal"
                  value={this.state.support_goal}
                  onChange={this.onChange}
                  errors={errors.support_goal}
                />
                <input
                  type="submit"
                  value="Create Profile"
                  className="btn btn-block btn-info"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getMyProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getMyProfile }
)(withRouter(EditProfile));
