import asyncHandler from "express-async-handler";
import { resetPasswordService } from "../../services/auth/ResetPasswordService";

const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  const isResetPassword = await resetPasswordService(token, password);

  return res.status(isResetPassword ? 200 : 400).json({
    message: isResetPassword ? "Reset success" : "Fail to reset",
    data: isResetPassword ?? [],
  });
});

module.exports = {
  resetPassword: resetPassword,
};
