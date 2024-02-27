const express = require("express");

const loginRequest = require("../requests/auth/LoginRequest");
const registerRequest = require('../requests/auth/RegisterRequest')
const verificationRequest = require('../requests/auth/VerificationRequest')
const loginController = require("../controllers/auth/LoginController");
const socialiteController = require("../controllers/auth/SocialiteController");
const registerController = require('../controllers/auth/RegisterController');
const forgotPasswordRequest = require("../requests/auth/ForgotPasswordRequest");
const forgotPasswordController = require('../controllers/auth/ForgotPasswordController')
const verificationController = require('../controllers/auth/VerificationController');
const resetPasswordController = require("../controllers/auth/ResetPasswordController");
const resetPasswordRequest = require("../requests/auth/ResetPasswordRequest");
const validate = require("../middlewares/Validate");

const router = express.Router();

const initAPIRoutes = (app) => {
  router.post("/login", loginRequest.login(), validate, loginController.login);
  router.get("/redirect/:provider", socialiteController.redirect);
  router.get("/callback/:provider", socialiteController.callback);
  router.post("/register", registerRequest.register(), validate, registerController.register);
  router.post("/forgot-password", forgotPasswordRequest.forgotPassword(), validate, forgotPasswordController.forgotPassword);
  router.post("/reset-password", resetPasswordRequest.resetPassword(), validate, resetPasswordController.resetPassword);
  router.get("/verify/:token", verificationController.verify);
  router.post("/send-verification-email", verificationRequest.verification(), validate, verificationController.sendVerificationEmail);

  app.use("/api/v1", router);
};

module.exports = initAPIRoutes;
