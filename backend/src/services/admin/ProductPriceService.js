import asyncHandler from "express-async-handler";
import db from "../../models/index";

const createProductPriceService = asyncHandler(async (data) => {
  const productId = data.productId;
  const product = await db.Product.findByPk(productId);

  if (!product) {
    return false;
  }

  const prices = data.prices;
  const createPricePromises = prices.map(async (priceData) => {
    const [price, effectiveDate] = priceData;
    await db.Price.create({
      productId: productId,
      price: price,
      effectiveDate: effectiveDate,
    });
  });

  await Promise.all(createPricePromises);

  return true;
});

module.exports = {
  createProductPriceService: createProductPriceService,
};
