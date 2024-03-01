"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    static associate(models) {
      OrderProduct.belongsTo(models.Product, {
        foreignKey: "product_id",
      });

      OrderProduct.belongsTo(models.Order, {
        foreignKey: "order_id",
      });
    }
  }
  OrderProduct.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      orderId: DataTypes.UUID,
      productId: DataTypes.UUID,
      quantity: DataTypes.INTEGER,
      purchasePrice: DataTypes.FLOAT,
    },
    {
      tableName: "order_product",
      timestamps: true,
      sequelize,
      modelName: "OrderProduct",
    }
  );
  return OrderProduct;
};
