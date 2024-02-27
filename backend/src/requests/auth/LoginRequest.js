const { body } = require("express-validator");

const login = () => [
  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email format wrong!"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = {
  login: login,
};
