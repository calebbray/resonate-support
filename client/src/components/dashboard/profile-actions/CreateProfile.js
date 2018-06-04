import React, { Component } from 'react';
import TextFieldGroup from '../../common/TextFieldGroup';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      site: '',
      support_goal: '',
      errors: {}
    };
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Profile</h1>
              <p className="lead text-center">
                Enter your site and support raising goal
              </p>
              <TextFieldGroup
                type="text"
                name="site"
                placeholder="Resonate Church Site"
                value={this.state.site}
                onChange={this.onChange}
                error={errors.site}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateProfile;
