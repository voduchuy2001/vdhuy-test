import asyncHandler from "express-async-handler";
import { createProductPriceService } from "../../services/admin/ProductPriceService";

const create = asyncHandler(async (req, res) => {
  const isSuccess = await createProductPriceService(req.body);

  return res.status(isSuccess ? 200 : 400).json({
    message: isSuccess ? "Created" : "Create Failed",
  });
});

module.exports = {
  create: create,
};
