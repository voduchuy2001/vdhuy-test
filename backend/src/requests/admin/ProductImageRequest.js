const { body } = require("express-validator");

const upload = () => [
  body("productId").notEmpty().withMessage("Product ID required!"),
];

const remove = () => [
  body("imageId").notEmpty().withMessage("Image ID required!"),
];

module.exports = {
  upload: upload,
  remove: remove,
};
