const create = (req, res) => {
  const orderData = {
    orderId: "123456",
    message: "Order created successfully!",
  };

  req.app.get("io").emit("orderCreated", orderData);

  res.status(200).json(orderData);
};

module.exports = {
  create: create,
};
