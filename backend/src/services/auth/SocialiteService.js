import asyncHandler from "express-async-handler";
import crypto from "crypto";
import db from "../../models/index";
import userDto from "../../dto/userDto";

const socialiteService = asyncHandler(async (email) => {
  let user = await db.User.findOne({ where: { email: email } });

  if (!user) {
    user = await db.User.create({
      email: email,
      password: crypto.randomBytes(10),
      verifiedAt: Date.now(),
    });
  }

  return userDto(user);
});

module.exports = socialiteService;
