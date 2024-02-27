import asyncHandler from "express-async-handler";
import db from "../../models/index";
import userDto from "../../dto/userDto";

const registerService = asyncHandler(
  async (name, email, password, referralCode) => {
    const isExit = await db.User.findOne({ where: { email: email } });

    if (isExit) {
      return false;
    }

    const user = await db.User.create({
      name: name,
      email: email,
      password: password,
      supervisorId: referralCode ?? null,
    });

    return userDto(user);
  }
);

module.exports = {
  registerService: registerService,
};
