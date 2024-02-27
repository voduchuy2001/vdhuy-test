const { body } = require("express-validator");

const register = () => [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email format wrong!"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("referralCode")
    .optional({ nullable: true, checkFalsy: true })
    .isUUID(4)
    .withMessage("Referral code must be a valid UUID"),
];

module.exports = {
  register: register,
};
