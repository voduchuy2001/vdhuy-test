const express = require("express");

const loginRequest = require("../requests/auth/LoginRequest");
const registerRequest = require('../requests/auth/RegisterRequest')
const loginController = require("../controllers/auth/LoginController");
const socialiteController = require("../controllers/auth/SocialiteController");
const registerController = require('../controllers/auth/RegisterController');
const forgotPasswordRequest = require("../requests/auth/ForgotPasswordRequest");
const forgotPasswordController = require('../controllers/auth/ForgotPasswordController')
const verificationController = require('../controllers/auth/VerificationController');
const resetPasswordController = require("../controllers/auth/ResetPasswordController");
const resetPasswordRequest = require("../requests/auth/ResetPasswordRequest");
const authenticatedController = require("../controllers/auth/AuthenticatedController");
const logoutController = require("../controllers/auth/LogoutController");
const AuthenticatedRequest = require("../requests/auth/AuthenticatedRequest");
const productController = require('../controllers/admin/ProductController');
const clientProductController = require('../controllers/client/ProductController');
const validate = require("../middlewares/Validate");
const { authenticated, isAdmin } = require('../middlewares/Authenticated');
const productRequest = require("../requests/admin/ProductRequest");
const clientOrderController = require('../controllers/client/OrderController');
const receiptRequest = require("../requests/admin/ReceiptRequest");
const receiptController = require("../controllers/admin/ReceiptController");
const upload = require("../config/multer");
const productImageController = require('../controllers/admin/ProductImageController');
const productImageRequest = require("../requests/admin/ProductImageRequest");
const orderRequest = require("../requests/client/OrderRequest");
const priceRequest = require("../requests/admin/PriceRequest");
const productPriceController = require('../controllers/admin/ProductPriceController');

const router = express.Router();

const initAPIRoutes = (app) => {
  router.post("/login", loginRequest.login(), validate, loginController.login);
  router.get("/redirect/:provider", socialiteController.redirect);
  router.get("/callback/:provider", socialiteController.callback);
  router.post("/register", registerRequest.register(), validate, registerController.register);
  router.post("/forgot-password", forgotPasswordRequest.forgotPassword(), validate, forgotPasswordController.forgotPassword);
  router.post("/reset-password", resetPasswordRequest.resetPassword(), validate, resetPasswordController.resetPassword);
  router.get("/verify/:token", verificationController.verify);
  router.post("/send-verification-email", authenticated, verificationController.sendVerificationEmail);
  router.get("/authenticated", AuthenticatedRequest.authenticated(),  [validate, authenticated], authenticatedController.authenticated);
  router.post("/logout", AuthenticatedRequest.authenticated(),  [validate, authenticated], logoutController.logout);

  router.get("/admin/product", [authenticated, isAdmin], productController.index);
  router.post("/admin/create-product", productRequest.create(), [authenticated, isAdmin, validate], productController.create);
  router.post("/admin/upload-product-image", upload.array('images'), productImageRequest.upload(), [authenticated, isAdmin, validate], productImageController.upload);
  router.delete("/admin/remove-product-image", productImageRequest.remove(), [authenticated, isAdmin, validate], productImageController.remove);

  router.post("/admin/create-product-price", priceRequest.create(), [authenticated, isAdmin, validate], productPriceController.create);

  router.post("/admin/create-receipt", receiptRequest.create(), [authenticated, isAdmin, validate], receiptController.create);
  router.put("/admin/confirm-receipt", receiptRequest.confirm(), [authenticated, isAdmin, validate], receiptController.confirm);

  router.get("/product", clientProductController.index);
  router.post("/order", orderRequest.create(), validate, clientOrderController.create);
  router.get("/callback-vnpay", clientOrderController.callbackVNPay);

  app.use("/api/v1", router);
};

module.exports = initAPIRoutes;
