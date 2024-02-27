"use strict";
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.User, {
        as: "supervisor",
        foreignKey: "supervisorId",
      });
      User.hasMany(models.User, {
        as: "subordinates",
        foreignKey: "supervisorId",
      });
    }

    static async comparePassword(password, user) {
      return await bcrypt.compare(password, user.password);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      supervisorId: DataTypes.UUID,
      verifiedAt: DataTypes.DATE,
      verifyToken: DataTypes.STRING,
      verifyTokenExpired: DataTypes.DATE,
      passwordChangedAt: DataTypes.DATE,
      resetPasswordToken: DataTypes.STRING,
      resetPasswordTokenExpired: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
          }
        },
      },
    }
  );
  return User;
};
