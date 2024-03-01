exports.ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
};

exports.PRODUCT_STATUS = {
  ACTIVE: "ACTIVE",
  DRAFT: "DRAFT",
  INACTIVE: "INACTIVE",
};

exports.PAYMENT_METHOD = {
  COD: "COD",
  VNPAY: "VNPAY",
};

exports.VNPAY = {
  ORDER_TYPE: process.env.APP_NAME ?? "PAY ORDER INVOICE",
};

exports.BANK_CODES = ["NCB"];

exports.ORDER_STATUS = {
  PENDING: "PENDING",
  DELIVERED: "DELIVERED",
  CANCELED: "CANCELED",
  SUCCESS: "SUCCESS",
  REFUNDED: "REFUNDED",
};

exports.PAYMENT_STATUS = {
  PAID: "PAID",
  UN_PAID: "UNPAID",
};

exports.RECEIPT_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECT: "REJECT",
};
