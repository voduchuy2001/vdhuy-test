"use strict";
const { Model } = require("sequelize");
const { RECEIPT_STATUS } = require("../constants");
module.exports = (sequelize, DataTypes) => {
  class Receipt extends Model {
    static associate(models) {
      Receipt.belongsTo(models.Product, {
        foreignKey: "productId",
      });
    }
  }
  Receipt.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      quantity: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      receiptDate: DataTypes.DATE,
      status: DataTypes.STRING,
      productId: DataTypes.UUID,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Receipt",
      tableName: "receipts",
      timestamps: true,
      hooks: {
        afterUpdate: async (receipt, options) => {
          if (
            receipt.changed("status") &&
            receipt.status === RECEIPT_STATUS.ACCEPTED
          ) {
            const product = await receipt.getProduct();
            if (product) {
              product.totalQuantity += receipt.quantity;
              await product.save();
            }
          }
        },
      },
    }
  );
  return Receipt;
};
