// repo of utility functions

// vanilla JavaScript date formatter
export const formatDate = date => {
  const numDate = parseInt(date, 10);
  // console.log(numDate);
  const newDate = new Date(numDate).toLocaleDateString('en-US');
  const newTime = new Date(numDate).toLocaleTimeString('en-US');
  return `${newDate} at ${newTime}`;
};
