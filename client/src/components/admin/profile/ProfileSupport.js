import React, { Component } from 'react';

class ProfileSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  render() {
    const { support_occurrences } = this.props.profile;
    console.log(support_occurrences.length);
    let support;

    if (support_occurrences.length > 0) {
      support = support_occurrences.map(occur => (
        <tr key={occur._id}>
          <td>{occur.name}</td>
          <td>{occur.amount}</td>
          <td>{occur.date}</td>
        </tr>
      ));
    }

    return (
      <div>
        <h2>Support Payments</h2>
        <table>
          <thead>
            <tr>
              <th>Donor Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{support}</tbody>
        </table>
        <button className="btn btn-info">Add Support</button>
      </div>
    );
  }
}

export default ProfileSupport;
