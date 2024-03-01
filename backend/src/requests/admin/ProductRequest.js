const { body } = require("express-validator");
const { PRODUCT_STATUS } = require("../../constants/index");

const create = () => [
  body("name").notEmpty().withMessage("Name required"),

  body("status")
    .notEmpty()
    .withMessage("Status required")
    .isIn(Object.values(PRODUCT_STATUS))
    .withMessage(
      `Invalid status value. Allowed values are ${Object.values(
        PRODUCT_STATUS
      ).join(", ")}`
    ),

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

  body("description").optional(),

  body("height")
    .optional({ nullable: true })
    .isFloat({ min: 1 })
    .withMessage("Height must be a number greater than 1"),

  body("weight")
    .optional({ nullable: true })
    .isFloat({ min: 1 })
    .withMessage("Weight must be a number greater than 1"),

  body("length")
    .optional({ nullable: true })
    .isFloat({ min: 1 })
    .withMessage("Length must be a number greater than 1"),

  body("width")
    .optional({ nullable: true })
    .isFloat({ min: 1 })
    .withMessage("Width must be a number greater than 1"),
];

module.exports = {
  create: create,
};
