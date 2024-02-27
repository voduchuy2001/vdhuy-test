const { body } = require("express-validator");

const verification = () => [
  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email format wrong!"),
];

module.exports = {
  verification: verification,
};
