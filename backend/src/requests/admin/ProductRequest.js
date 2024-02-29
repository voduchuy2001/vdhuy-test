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
  body("price")
    .notEmpty()
    .withMessage("Price required")
    .isFloat({ min: 1 })
    .withMessage("Price must be a number greater than 1"),
  body("effectiveDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Must be a valid date (ISO 8601 format)"),
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
