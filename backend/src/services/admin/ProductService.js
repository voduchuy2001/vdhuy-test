import asyncHandler from "express-async-handler";
import db from "../../models/index";

const getProductsWithPriceService = asyncHandler(
  async (page = 1, limit = 10, include = []) => {
    const offset = (page - 1) * parseInt(limit);
    const queryOptions = {
      offset: offset,
      limit: parseInt(limit),
      include: db.Price,
    };

    const { rows, count } = await db.Product.findAndCountAll(queryOptions);

    const totalPages = Math.ceil(count / parseInt(limit));

    return {
      totalCount: count,
      totalPages: totalPages,
      currentPage: page,
      data: rows,
    };
  }
);

const createProductService = asyncHandler(async (data) => {
  const product = await db.Product.create(data);

  const productPrice = await db.Price.create({
    price: data.price,
    effectiveDate: data.effectiveDate ?? Date.now(),
    productId: product.id,
  });

  return !!(product && productPrice);
});

module.exports = {
  getProductsWithPriceService: getProductsWithPriceService,
  createProductService: createProductService,
};
