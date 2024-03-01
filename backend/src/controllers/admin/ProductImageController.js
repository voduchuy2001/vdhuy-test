import asyncHandler from "express-async-handler";
import {
  uploadProductImageService,
  removeProductImageService,
} from "../../services/admin/ProductImageService";

const upload = asyncHandler(async (req, res) => {
  const files = req.files;
  const { productId } = req.body;

  const isSuccess = await uploadProductImageService(productId, files);

  return res.status(isSuccess ? 200 : 400).json({
    message: isSuccess ? "Uploaded" : "Upload Failed",
  });
});

const remove = asyncHandler(async (req, res) => {
  const { imageId } = req.body;
  const isSuccess = await removeProductImageService(imageId);

  return res.status(isSuccess ? 200 : 400).json({
    message: isSuccess ? "Removed" : "Remove Failed",
  });
});

module.exports = {
  upload: upload,
  remove: remove,
};
