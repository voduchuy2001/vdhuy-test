const { body } = require("express-validator");

const forgotPassword = () => [
  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email format wrong!"),
];

module.exports = {
  forgotPassword: forgotPassword,
};
