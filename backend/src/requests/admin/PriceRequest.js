const { body } = require("express-validator");

const create = () => [
  body("productId")
    .notEmpty()
    .withMessage("Product ID required")
    .isUUID()
    .withMessage("Is UUID"),

  body("prices")
    .notEmpty()
    .withMessage("Prices required")
    .isArray({ min: 1 })
    .withMessage("Prices must be a non-empty array"),

  body("prices.*")
    .isArray({ min: 2, max: 2 })
    .withMessage("Each price must be an array with 2 elements"),
  body("prices.*.0").isNumeric().withMessage("Price value must be numeric"),

  body("prices.*.1")
    .isISO8601()
    .withMessage("Effective date must be a valid ISO 8601 date"),
];

module.exports = {
  create: create,
};
