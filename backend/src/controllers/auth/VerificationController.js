const asyncHandler = require("express-async-handler");
import db from "../../models/index";
import {
  verifyService,
  sendVerificationEmailService,
} from "../../services/auth/VerificationService";

const verify = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const isValid = await verifyService(token);

  return res.status(isValid ? 200 : 400).json({
    message: isValid ? "Verify success" : "Fail to verify",
    data: isValid ?? [],
  });
});

const sendVerificationEmail = asyncHandler(async (req, res) => {
  let id = req.user.id;

  const user = await db.User.findByPk(id);

  const isValid = await sendVerificationEmailService(user.email);

  return res.status(isValid ? 200 : 400).json({
    message: isValid ? "Resend success" : "Fail to resend",
    data: isValid ?? [],
  });
});

module.exports = {
  verify: verify,
  sendVerificationEmail: sendVerificationEmail,
};
