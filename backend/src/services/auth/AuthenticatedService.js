import asyncHandler from "express-async-handler";
import db from "../../models/index";
import userDto from "../../dto/userDto";

const authenticatedService = asyncHandler(async (id) => {
  const user = await db.User.findByPk(id);

  if (!user) {
    return false;
  }

  return userDto(user);
});

module.exports = {
  authenticatedService: authenticatedService,
};
