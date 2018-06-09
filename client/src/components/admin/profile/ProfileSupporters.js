import React, { Component } from 'react';

class ProfileSupporters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  render() {
    const { pledge_supporters } = this.props.profile;
    let supporters;

    if (pledge_supporters.length > 0) {
      supporters = pledge_supporters.map(supporter => (
        <tr key={supporter._id}>
          <td>{supporter.name}</td>
          <td>{supporter.pledge_amount}</td>
          <td>{supporter.phone && supporter.phone}</td>
          <td>{supporter.email && supporter.email}</td>
          <td>
            <button>View</button>
          </td>
        </tr>
      ));
    }

    return (
      <div>
        <h2>Support Team</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Support Amount</th>
              <th>Phone</th>
              <th>Email</th>
              <th />
            </tr>
          </thead>
          <tbody>{supporters}</tbody>
        </table>
        <button className="btn btn-info">Add Supporter</button>
      </div>
    );
  }
}
export default ProfileSupporters;
