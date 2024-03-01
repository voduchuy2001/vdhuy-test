import asyncHandler from "express-async-handler";
import db from "../../models/index";
import otpGenerator from "otp-generator";
import cache from "../../config/cache";
import transporter from "../../config/mail";
import { RECEIPT_STATUS } from "../../constants";

const createReceiptService = asyncHandler(async (data, userId) => {
  const product = await db.Product.findByPk(data.productId);

  if (!product) {
    return false;
  }

  const receipt = await db.Receipt.create({
    quantity: data.quantity,
    price: data.price,
    receiptDate: data.receiptDate,
    productId: data.productId,
    userId: userId,
  });

  const user = await db.User.findByPk(userId);
  const otp = otpGenerator.generate(6);
  cache.set("createReceiptOTP", { otp, receiptId: receipt.id }, 300);

  const html = `This code will expire in 5 minutes: ${otp}`;

  const submitted = await transporter.sendMail({
    from: process.env.MAIL_FROM_ADDRESS,
    to: user.email,
    subject: "Confirm create new receipt",
    html,
  });

  return !!(receipt && user && otp && submitted);
});

const confirmReceiptService = asyncHandler(async (data, userId) => {
  const user = await db.User.findByPk(userId);

  if (!user) {
    return false;
  }

  const otpCache = cache.get("createReceiptOTP");

  if (!otpCache || otpCache.otp !== data.otp) {
    return false;
  }

  const receiptId = otpCache.receiptId;

  const receipt = await db.Receipt.findByPk(receiptId);

  if (!receipt) {
    return false;
  }

  receipt.status = RECEIPT_STATUS.ACCEPTED;
  await receipt.save();

  cache.del("createReceiptOTP");

  return true;
});

module.exports = {
  createReceiptService: createReceiptService,
  confirmReceiptService: confirmReceiptService,
};
