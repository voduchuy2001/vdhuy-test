"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Receipt extends Model {
    static associate(models) {}
  }
  Receipt.init(
    {
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Receipt",
    }
  );
  return Receipt;
};
