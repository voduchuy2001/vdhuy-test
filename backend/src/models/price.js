"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    static associate(models) {
      Price.belongsTo(models.Product, {
        foreignKey: "productId",
      });
    }
  }
  Price.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      price: DataTypes.FLOAT,
      effectiveDate: DataTypes.DATE,
      productId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Price",
      timestamps: true,
      tableName: "prices",
    }
  );
  return Price;
};
