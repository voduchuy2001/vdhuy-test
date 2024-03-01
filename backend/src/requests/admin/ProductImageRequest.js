const { body } = require("express-validator");

const upload = () => [
  body("productId")
    .notEmpty()
    .withMessage("Product ID required!")
    .isUUID()
    .withMessage("Is UUID"),
];

const remove = () => [
  body("imageId")
    .notEmpty()
    .withMessage("Image ID required!")
    .isUUID()
    .withMessage("Is UUID"),
];

module.exports = {
  upload: upload,
  remove: remove,
};
