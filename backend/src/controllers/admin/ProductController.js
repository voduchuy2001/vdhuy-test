import asyncHandler from "express-async-handler";
import db from "../../models/index";
import {
  createProductService,
  getProductsWithPriceService,
} from "../../services/admin/ProductService";
import { isValidPositiveInteger } from "../../utils/ValidPositiveInteger";

const index = asyncHandler(async (req, res) => {
  const page = isValidPositiveInteger(parseInt(req.query.page))
    ? parseInt(req.query.page)
    : 1;
  const limit = isValidPositiveInteger(parseInt(req.query.limit))
    ? parseInt(req.query.limit)
    : 10;

  const data = await getProductsWithPriceService(page, limit);

  return res.status(data ? 200 : 400).json({
    message: data ? "Get Products Successfully!" : "Get Products Failed!",
    data: data,
  });
});

const create = asyncHandler(async (req, res) => {
  const isSuccess = await createProductService(req.body);

  return res.status(isSuccess ? 200 : 400).json({
    message: isSuccess
      ? "Create Product Successfully!"
      : "Create Product Failed!",
    data: isSuccess ?? [],
  });
});

const edit = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await db.Product.findByPk(productId, {
    include: {
      model: db.Price,
      required: false,
      order: [["effectiveDate", "DESC"]],
      limit: 1,
    },
  });

  return res.status(product ? 200 : 400).json({
    message: product ? "Get Product Successfully!" : "Get Product Failed!",
    data: product ?? [],
  });
});

module.exports = {
  index: index,
  create: create,
  edit: edit,
};
