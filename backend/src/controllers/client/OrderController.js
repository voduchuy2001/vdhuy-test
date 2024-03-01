import asyncHandler from "express-async-handler";
import {
  createOrderService,
  callbackVNPayService,
} from "../../services/client/OrderService";

const create = asyncHandler(async (req, res) => {
  const ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const isSuccess = await createOrderService(req, ipAddr, req.body);

  return res.status(isSuccess ? 200 : 400).json({
    message: isSuccess ? "Order Created Successfully" : "Order Created Failed",
    data: isSuccess ?? [],
  });
});

const callbackVNPay = asyncHandler(async (req, res) => {
  let vnpParams = req.query;
  const isSuccess = await callbackVNPayService(vnpParams);

  return res.status(isSuccess ? 200 : 400).json({
    message: isSuccess ? "Payment Successfully" : "Payment Failed",
  });
});

module.exports = {
  create: create,
  callbackVNPay: callbackVNPay,
};
