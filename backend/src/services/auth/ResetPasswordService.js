import asyncHandler from "express-async-handler";
import { hashResetPasswordToken } from "../../utils/GenerateToken";
import db from "../../models/index";
import userDto from "../../dto/userDto";

const resetPasswordService = asyncHandler(async (token, password) => {
  const hashedToken = hashResetPasswordToken(token);

  const user = await db.User.findOne({
    where: {
      resetPasswordToken: hashedToken,
      resetPasswordTokenExpired: { [db.Sequelize.Op.gt]: Date.now() },
    },
  });

  if (!user) {
    return false;
  }

  const updatedPassword = await user.update({
    resetPasswordToken: null,
    resetPasswordTokenExpired: null,
    password: password,
    passwordChangedAt: new Date(),
  });

  if (!updatedPassword) {
    return false;
  }

  return userDto(updatedPassword);
});

module.exports = {
  resetPasswordService: resetPasswordService,
};
