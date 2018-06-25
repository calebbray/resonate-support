import React, { Component } from 'react';
import TextFieldGroup from '../../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../../actions/profileActions';
import { withRouter } from 'react-router-dom';

class CreateProfile extends Component {
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
    if (!this.props.profile.profile) {
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
    const { site, support_goal } = this.state;
    const newProfile = {
      site,
      support_goal
    };

    this.props.createProfile(newProfile, this.props.history);
    e.preventDefault();
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="form-container">
              <h1 className="display-4 text-center">Create Profile</h1>
              <p className="lead text-center">
                Enter your site and support raising goal
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
