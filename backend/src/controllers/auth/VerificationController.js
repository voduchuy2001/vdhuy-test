const asyncHandler = require("express-async-handler");
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
  const { email } = req.body;

  const isValid = await sendVerificationEmailService(email);

  return res.status(isValid ? 200 : 400).json({
    message: isValid ? "Resend success" : "Fail to resend",
    data: isValid ?? [],
  });
});

module.exports = {
  verify: verify,
  sendVerificationEmail: sendVerificationEmail,
};
