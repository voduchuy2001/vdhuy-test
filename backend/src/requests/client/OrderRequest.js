const { body } = require("express-validator");
const { PAYMENT_METHOD, BANK_CODES } = require("../../constants");

const create = () => [
  body("name").notEmpty().withMessage("Name required"),

  body("address").notEmpty().withMessage("Address required"),

  body("email")
    .notEmpty()
    .withMessage("Address required")
    .isEmail()
    .withMessage("Check type of email"),

  body("paymentMethod")
    .isIn(Object.values(PAYMENT_METHOD))
    .withMessage(`Allow value of ${Object.values(PAYMENT_METHOD)}`),

  body("bankCode").custom((value, { req }) => {
    if (req.body.paymentMethod === PAYMENT_METHOD.VNPAY) {
      if (!value || !BANK_CODES.includes(value)) {
        throw new Error(
          `Bank code is required for VNPAY payment method. We support ${BANK_CODES}`
        );
      }
    }
    return true;
  }),

  body("phoneNumber")
    .matches(/^(?:\+84|0)(?:3[2-9]|5[2689]|7[06789]|8[1-9]|9[0-9])[0-9]{7}$/)
    .withMessage("Invalid Vietnamese phone number"),

  body("note").optional({ nullable: true }),

  body("orderProducts")
    .isArray()
    .withMessage("Order products must be an array"),

  body("orderProducts.*")
    .isArray({ min: 3, max: 3 })
    .withMessage("Each order product must be an array with 3 elements"),

  body("orderProducts.*").custom((value, { req }) => {
    const [productId, quantity, unitPrice] = value;
    if (!productId || typeof productId !== "string") {
      throw new Error("Invalid product ID");
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error("Invalid quantity");
    }
    if (typeof unitPrice !== "number" || unitPrice <= 0) {
      throw new Error("Invalid unit price");
    }
    return true;
  }),
];

module.exports = {
  create: create,
};
