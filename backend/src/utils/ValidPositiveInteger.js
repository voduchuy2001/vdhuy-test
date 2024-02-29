const isValidPositiveInteger = (value) => {
  return Number.isInteger(value) && value > 0;
};

module.exports = {
  isValidPositiveInteger: isValidPositiveInteger,
};
