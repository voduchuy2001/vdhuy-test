"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Price, {
        foreignKey: "productId",
      });

      Product.hasMany(models.Receipt, {
        foreignKey: "productId",
      });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      height: DataTypes.FLOAT,
      weight: DataTypes.FLOAT,
      length: DataTypes.FLOAT,
      width: DataTypes.FLOAT,
      totalQuantity: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: true,
      tableName: "products",
    }
  );
  return Product;
};
