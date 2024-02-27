const asyncHandler = require("express-async-handler");
const { registerService } = require("../../services/auth/RegisterService");

const register = asyncHandler(async (req, res) => {
  const { name, email, password, referralCode } = req.body;

  const isRegister = await registerService(name, email, password, referralCode);

  return res.status(isRegister ? 200 : 400).json({
    message: isRegister ? "Register success" : "Fail to register",
    data: isRegister ?? [],
  });
});

module.exports = {
  register: register,
};
