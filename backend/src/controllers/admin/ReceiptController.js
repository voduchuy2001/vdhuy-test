import asyncHandler from "express-async-handler";
import {
  createReceiptService,
  confirmReceiptService,
} from "../../services/admin/ReceiptService";

const create = asyncHandler(async (req, res) => {
  const isSuccess = await createReceiptService(req.body, req.user.id);

  return res.status(isSuccess ? 200 : 400).json({
    message: isSuccess
      ? "Create Receipt Success, Please check your email to get the confirm code to update receipt status"
      : "Fail To Create",
  });
});

const confirm = asyncHandler(async (req, res) => {
  const isSuccess = await confirmReceiptService(req.body, req.user.id);

  return res.status(isSuccess ? 200 : 400).json({
    message: isSuccess ? "Confirm Receipt success" : "Fail To Confirm",
  });
});

module.exports = {
  create: create,
  confirm: confirm,
};
