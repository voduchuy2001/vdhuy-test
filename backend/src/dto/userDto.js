const userDto = (user) => {
  const {
    password,
    verifyToken,
    verifyTokenExpired,
    resetPasswordToken,
    resetPasswordTokenExpired,
    ...userData
  } = user.dataValues;
  return userData;
};

module.exports = userDto;
