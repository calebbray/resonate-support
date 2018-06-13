import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSupport } from '../../actions/profileActions';
import SupportSummary from './SupportSummary';

class SupportData extends Component {
  render() {
    const {
      pledge_supporters,
      support_goal,
      support_occurrences
    } = this.props.profile.profile;
    let supportTotal = 0;

    pledge_supporters.forEach(supporter => {
      supportTotal += Number(supporter.pledge_amount);
    });

    support_occurrences.forEach(support => {
      supportTotal += Number(support.amount);
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
        <h2 className="text-center">
          {months[supportPeriod.getMonth()]}, {supportPeriod.getFullYear()}
        </h2>
        <SupportSummary />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addSupport }
)(SupportData);
