export default support => {
  return support
    .map(occur => Number(occur.amount))
    .reduce((sum, value) => sum + value, 0);
};
