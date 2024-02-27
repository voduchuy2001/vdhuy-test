import asyncHandler from "express-async-handler";
import { forgotPasswordService } from "../../services/auth/ForgotPasswordService.js";
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const isForgotPassword = await forgotPasswordService(email);

  return res.status(isForgotPassword ? 200 : 400).json({
    message: isForgotPassword ? "A link reset has been sent" : "Fail to send",
  });
});

module.exports = {
  forgotPassword: forgotPassword,
};
