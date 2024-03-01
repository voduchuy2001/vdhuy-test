import asyncHandler from "express-async-handler";
import db from "../../models/index";

const getProductsWithPriceService = asyncHandler(
  async (page = 1, limit = 10) => {
    const offset = (page - 1) * parseInt(limit);
    const queryOptions = {
      offset: offset,
      limit: parseInt(limit),
      include: [db.Price, db.Image],
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

  if (!product) {
    return false;
  }

  if (data.prices && Array.isArray(data.prices)) {
    await Promise.all(
      data.prices.map(async (priceItem) => {
        const [price, effectiveDate] = priceItem;

        await db.Price.create({
          price,
          effectiveDate: effectiveDate || new Date(),
          productId: product.id,
        });
      })
    );
  }

  return true;
});

module.exports = {
  getProductsWithPriceService: getProductsWithPriceService,
  createProductService: createProductService,
};
