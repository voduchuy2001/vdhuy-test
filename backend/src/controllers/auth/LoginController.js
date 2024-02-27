import asyncHandler from "express-async-handler";
import { loginService } from "../../services/auth/LoginService";
import { generateAccessToken } from "../../utils/GenerateToken";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const isLogin = await loginService(email, password);
  const accessToken = generateAccessToken(isLogin.id);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  return res.status(isLogin ? 200 : 400).json({
    message: isLogin ? "Login success" : "Fail to login",
    data: isLogin ?? [],
  });
});

module.exports = {
  login: login,
};
