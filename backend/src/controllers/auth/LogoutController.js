import asyncHandler from "express-async-handler";

const logout = asyncHandler(async (req, res) => {
  const isLogout = res.clearCookie("accessToken");

  return res.status(isLogout ? 200 : 400).json({
    message: isLogout ? "User is logout" : "Fail to logout",
  });
});

module.exports = {
  logout: logout,
};
