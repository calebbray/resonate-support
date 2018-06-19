import React from 'react';
import { connect } from 'react-redux';
import getVisibleSupport from '../../selectors/visibleSupport';
import supportTotal from '../../selectors/supportTotal';
import numeral from 'numeral';

const SupportSummary = ({ supportTotal, profile }) => {
  const { support_goal } = profile.profile;
  return (
    <div className="support-summary secondary-content">
      <h3
        className={
          supportTotal >= Number(support_goal)
            ? 'text-center passing'
            : 'text-center failing'
        }
      >
        {numeral(supportTotal).format('$0,0.00')}
      </h3>

      <p className="text-center">
        {numeral(supportTotal).format('$0,0.00')} out of{' '}
        {numeral(support_goal).format('$0,0.00')} raised{' '}
      </p>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleSupport = getVisibleSupport(
    state.profile.profile.support_occurrences,
    state.filters
  );
  return {
    supportTotal: supportTotal(visibleSupport),
    profile: state.profile
  };
};

export default connect(mapStateToProps)(SupportSummary);
