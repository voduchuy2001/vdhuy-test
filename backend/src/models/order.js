"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
      });

      Order.hasMany(models.OrderProduct, {
        foreignKey: "order_id",
      });
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      staffId: DataTypes.UUID,
      note: DataTypes.TEXT,
      paymentMethod: DataTypes.STRING,
      status: DataTypes.STRING,
      totalAmount: DataTypes.FLOAT,
      paymentStatus: DataTypes.STRING,
      bankCode: DataTypes.STRING,
    },
    {
      tableName: "orders",
      timestamps: true,
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
