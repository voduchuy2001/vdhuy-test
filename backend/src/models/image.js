"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Product, {
        foreignKey: "productId",
      });
    }
  }
  Image.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      url: DataTypes.STRING,
      productId: DataTypes.UUID,
    },
    {
      tableName: "images",
      timestamps: true,
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
