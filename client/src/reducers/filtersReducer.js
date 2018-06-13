import moment from 'moment';

const initialState = {
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
