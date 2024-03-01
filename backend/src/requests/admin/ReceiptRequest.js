const { body } = require("express-validator");
const { RECEIPT_STATUS } = require("../../constants");

const create = () => [
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 1 })
    .withMessage("Price must be a non-negative float"),

  body("receiptDate")
    .notEmpty()
    .withMessage("Receipt date is required")
    .isISO8601()
    .withMessage("Receipt date must be a valid ISO 8601 date"),

  body("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isUUID()
    .withMessage("Product ID must be a valid UUID"),
];

const confirm = () => [body("otp").notEmpty().withMessage("OTP required")];

module.exports = {
  create: create,
  confirm: confirm,
};
