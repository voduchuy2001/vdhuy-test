"use strict";

const { ROLES } = require("../constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID, // Thay đổi kiểu dữ liệu của cột id thành UUID
        defaultValue: Sequelize.UUIDV4, // Thiết lập giá trị mặc định cho cột id là một UUID ngẫu nhiên
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: ROLES.USER,
      },
      supervisorId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      verifiedAt: {
        type: Sequelize.DATE,
      },
      verifyToken: {
        type: Sequelize.STRING,
      },
      verifyTokenExpired: {
        type: Sequelize.DATE,
      },
      passwordChangedAt: {
        type: Sequelize.DATE,
      },
      resetPasswordToken: {
        type: Sequelize.STRING,
      },
      resetPasswordTokenExpired: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
