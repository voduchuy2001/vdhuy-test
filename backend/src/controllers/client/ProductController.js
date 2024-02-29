import asyncHandler from "express-async-handler";
import productService from "../../services/client/ProductService";
import { isValidPositiveInteger } from "../../utils/ValidPositiveInteger";

const index = asyncHandler(async (req, res) => {
  const page = isValidPositiveInteger(parseInt(req.query.page))
    ? parseInt(req.query.page)
    : 1;
  const limit = isValidPositiveInteger(parseInt(req.query.limit))
    ? parseInt(req.query.limit)
    : 10;

  const productsWithLatestPrice =
    await productService.getProductsWithLatestPrice(page, limit);

  return res.status(productsWithLatestPrice ? 200 : 400).json({
    message: productsWithLatestPrice
      ? "Get Products Successfully!"
      : "Fail to get data",
    data: productsWithLatestPrice ?? [],
  });
});

module.exports = {
  index: index,
};
