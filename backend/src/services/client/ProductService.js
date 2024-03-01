import db from "../../models/index";
import { PRODUCT_STATUS } from "../../constants/index";

const getProductsWithPriceService = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const currentDate = new Date();

  const productsWithLatestPrice = await db.Product.findAndCountAll({
    where: {
      status: PRODUCT_STATUS.ACTIVE,
      totalQuantity: {
        [db.Sequelize.Op.gt]: 0,
      },
    },
    include: [
      {
        model: db.Price,
        where: {
          effectiveDate: {
            [db.Sequelize.Op.lte]: currentDate,
          },
        },
        required: false,
        order: [["effectiveDate", "DESC"]],
        limit: 1,
      },
      {
        model: db.Image,
      },
    ],
    offset: offset,
    limit: limit,
  });

  const totalPages = Math.ceil(productsWithLatestPrice.count / limit);

  return {
    currentPage: page,
    totalPages: totalPages,
    totalItems: productsWithLatestPrice.count,
    products: productsWithLatestPrice.rows,
  };
};

module.exports = {
  getProductsWithPriceService: getProductsWithPriceService,
};
