const { cookie } = require("express-validator");

const authenticated = () => [
  cookie("accessToken").notEmpty().withMessage("Access token required!"),
];

module.exports = {
  authenticated: authenticated,
};
