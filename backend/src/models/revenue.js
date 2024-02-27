"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Revenue extends Model {
    static associate(models) {}
  }
  Revenue.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Revenue",
    }
  );
  return Revenue;
};
