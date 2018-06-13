import moment from 'moment';

const getVisibleSupport = (support, { sortBy, startDate, endDate }) => {
  return support
    .filter(support => {
      const dateAdded = moment(support.date);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(dateAdded, 'day')
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(dateAdded, 'day')
        : true;
      return startDateMatch && endDateMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.dateAdded < b.dateAdded ? 1 : -1;
      }
    });
};

export default getVisibleSupport;
