import asyncHandler from "express-async-handler";
import db from "../../models/index";

const uploadProductImageService = asyncHandler(async (productId, files) => {
  if (!files || !productId) {
    return false;
  }

  const product = await db.Product.findByPk(productId);

  if (!product) {
    return false;
  }

  const createImagePromises = files.map(async (file) => {
    await createImage(file.filename, productId);
  });

  const uploaded = await Promise.all(createImagePromises);

  if (!uploaded) {
    return false;
  }

  return true;
});

const createImage = asyncHandler(async (fileName, productId) => {
  return await db.Image.create({
    url: fileName,
    productId: productId,
  });
});

const removeProductImageService = asyncHandler(async (imageId) => {
  const isRemoved = await db.Image.destroy({ where: { id: imageId } });

  if (!isRemoved) {
    return false;
  }

  return true;
});

module.exports = {
  uploadProductImageService: uploadProductImageService,
  removeProductImageService: removeProductImageService,
};
