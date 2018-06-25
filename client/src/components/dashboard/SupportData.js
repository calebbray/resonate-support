import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSupport } from '../../actions/profileActions';
import SupportSummary from './SupportSummary';

class SupportData extends Component {
  render() {
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
      <div className="col-2 card secondary-content">
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
