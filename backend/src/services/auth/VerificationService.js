import asyncHandler from "express-async-handler";
import {
  hashVerifyToken,
  generateVerifyToken,
} from "../../utils/GenerateToken";
import db from "../../models/index";
import transporter from "../../config/mail";
import { Op } from "sequelize";

const sendVerificationEmailService = asyncHandler(async (email) => {
  const verifyToken = generateVerifyToken();

  const user = await db.User.findOne({
    where: { email: email },
  });

  if (!user) {
    return false;
  }

  await user.update({
    verifyToken: hashVerifyToken(verifyToken),
    verifyTokenExpired: new Date(Date.now() + 15 * 60 * 1000),
  });

  const html = `You are receiving this email because we need to authenticate you as a real user. This link will expire in 15 minutes. <a href=${process.env.URL_SERVER}/api/v1/verify/${verifyToken}>Click here</a>`;

  const submitted = await transporter.sendMail({
    from: process.env.MAIL_FROM_ADDRESS,
    to: user.email,
    subject: "Activate Account",
    html,
  });

  if (!submitted) {
    return false;
  }

  return true;
});

const verifyService = asyncHandler(async (token) => {
  const hashedToken = hashVerifyToken(token);

  const user = await db.User.findOne({
    where: {
      verifyToken: hashedToken,
      verifyTokenExpired: { [Op.gt]: Date.now() },
    },
  });

  if (!user) return false;

  await user.update({
    verifyToken: null,
    verifyTokenExpired: null,
    verifiedAt: Date.now(),
  });

  return true;
});

module.exports = {
  sendVerificationEmailService: sendVerificationEmailService,
  verifyService: verifyService,
};
