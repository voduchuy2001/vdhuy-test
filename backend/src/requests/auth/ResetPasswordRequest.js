const { body } = require("express-validator");

const resetPassword = () => [
  body("token").notEmpty().withMessage("Token is required!"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = {
  resetPassword: resetPassword,
};
