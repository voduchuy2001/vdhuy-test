import asyncHandler from "express-async-handler";
import db from "../../models/index";
import userDto from "../../dto/userDto";

const loginService = asyncHandler(async (email, password) => {
  const user = await db.User.findOne({ where: { email: email } });

  if (!user) {
    return false;
  }

  const isMatch = await db.User.comparePassword(password, user);

  if (!isMatch) {
    return false;
  }

  return userDto(user);
});

module.exports = {
  loginService: loginService,
};
