import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SupportData extends Component {
  render() {
    const { pledge_supporters } = this.props.profile.profile;
    let supportTotal = 0;
    pledge_supporters.forEach(supporter => {
      supportTotal += Number(supporter.pledge_amount);
    });

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const supportPeriod = new Date();
    return (
      <div>
        <h2>
          {months[supportPeriod.getMonth()]}, {supportPeriod.getFullYear()}
        </h2>
        <h3 className="text-center">${parseFloat(supportTotal).toFixed(2)}</h3>
        <p>
          ${supportTotal} out of ${this.props.profile.profile.support_goal}{' '}
          raised{' '}
        </p>
        <Link to="/add-support" className="btn btn-info">
          Add Support
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(SupportData);
