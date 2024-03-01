import asyncHandler from "express-async-handler";

const create = asyncHandler((req, res) => {
  const {} = req.body;
  req.app.get("io").emit("orderCreated", orderData);
});

module.exports = {
  create: create,
};
