import asyncHandler from "express-async-handler";
import db from "../../models/index";
import { PAYMENT_METHOD, PAYMENT_STATUS, VNPAY } from "../../constants/index";
import moment from "moment";
import { sortObject } from "../../utils/SortObjectVNPay";
import querystring from "qs";
const QueryString = require("qs");

const createOrderService = asyncHandler(async (req, ipAddr, data) => {
  const orderProducts = data.orderProducts;
  const { name, address, email, paymentMethod, bankCode, phoneNumber } = data;

  const order = await db.Order.create({
    name: name,
    address: address,
    email: email,
    paymentMethod: paymentMethod,
    bankCode: bankCode || null,
    phoneNumber: phoneNumber,
    totalAmount: calculateTotalAmount(orderProducts),
  });

  const createdOrderProducts = await Promise.all(
    orderProducts.map(async (orderProduct) => {
      const [productId, quantity, purchasePrice] = orderProduct;

      const product = await db.Product.findByPk(productId);

      if (!product) {
        return null;
      }

      return db.OrderProduct.create({
        orderId: order.id,
        productId: productId,
        quantity: quantity,
        purchasePrice: purchasePrice,
      });
    })
  );

  if (!order || !createdOrderProducts) {
    return false;
  }

  if (paymentMethod === PAYMENT_METHOD.VNPAY) {
    return redirectVNPay(ipAddr, bankCode, order.id, order.totalAmount);
  }

  req.app.get("io").emit("orderCreated", order);

  return order;
});

const redirectVNPay = asyncHandler(
  async (ipAddr, bankCodeSupport, orderId, totalAmount) => {
    let tmnCode = process.env.VNPAY_TMNCODE;
    let secretKey = process.env.VNPAY_SECRETKEY;
    let vnpUrl = process.env.VNPAY_URL;
    let returnUrl = process.env.VNPAY_RETURN_URL;

    let date = new Date();
    let createDate = moment(date).format("YYYYMMDDHHmmss");
    let amount = totalAmount;
    let bankCode = bankCodeSupport;
    let orderInfo = process.env.APP_NAME;
    let orderType = VNPAY.ORDER_TYPE;
    let locale = "vn";

    let currCode = "VND";
    let vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    vnp_Params["vnp_BankCode"] = bankCode;
    vnp_Params = sortObject(vnp_Params);

    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

    return vnpUrl;
  }
);

const calculateTotalAmount = (orderProducts) => {
  let totalAmount = 0;
  orderProducts.forEach((orderProduct) => {
    const [productId, quantity, purchasePrice] = orderProduct;

    totalAmount += quantity * purchasePrice;
  });

  return totalAmount;
};

const callbackVNPayService = asyncHandler(async (VNPAYParams) => {
  let secureHash = VNPAYParams["vnp_SecureHash"];
  delete VNPAYParams["vnp_SecureHash"];
  delete VNPAYParams["vnp_SecureHashType"];

  VNPAYParams = sortObject(VNPAYParams);

  let secretKey = process.env.VNPAY_SECRETKEY;

  let signData = QueryString.stringify(VNPAYParams, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  if (secureHash !== signed) {
    return false;
  }

  if (VNPAYParams["vnp_ResponseCode" !== "00"]) {
    return false;
  }

  const orderId = VNPAYParams["vnp_TxnRef"];
  const order = await db.Order.update(
    { paymentStatus: PAYMENT_STATUS.PAID },
    { where: { id: orderId } }
  );

  if (order[0] !== 1) {
    return false;
  }

  return true;
});

module.exports = {
  createOrderService: createOrderService,
  callbackVNPayService: callbackVNPayService,
};
