import asyncHandler from "express-async-handler";
import db from "../../models/index";
import {
  generateResetPasswordToken,
  hashResetPasswordToken,
} from "../../utils/GenerateToken";
import transporter from "../../config/mail";

const forgotPasswordService = asyncHandler(async (email) => {
  const user = await db.User.findOne({ where: { email: email } });

  if (!user) {
    return false;
  }

  await sendResetPasswordEmail(user);

  return true;
});

const sendResetPasswordEmail = asyncHandler(async (user) => {
  const resetPwdToken = generateResetPasswordToken();

  const updatedUser = await user.update({
    resetPasswordToken: hashResetPasswordToken(resetPwdToken),
    resetPasswordTokenExpired: new Date(Date.now() + 15 * 60 * 1000),
  });

  if (!updatedUser) {
    return false;
  }

  const html = `This link will expire in 15 minutes. <a href=${process.env.URL_SERVER}/api/v1/reset-password/${resetPwdToken}>Click here</a>`;

  const submitted = await transporter.sendMail({
    from: process.env.MAIL_FROM_ADDRESS,
    to: updatedUser.email,
    subject: "Reset Password",
    html,
  });

  if (!submitted) {
    return false;
  }

  return true;
});

module.exports = {
  forgotPasswordService: forgotPasswordService,
};
