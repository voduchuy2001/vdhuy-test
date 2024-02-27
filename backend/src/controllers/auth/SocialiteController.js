import asyncHandler from "express-async-handler";
const passport = require("../../config/passport");
import socialiteService from "../../services/auth/SocialiteService";
import { generateAccessToken } from "../../utils/GenerateToken";

const redirect = (req, res) => {
  const { provider } = req.params;
  const validProvider = checkProvider(provider);

  if (!validProvider) {
    return res.status(400).json({
      message: "Not found",
    });
  }

  passport.authenticate(provider, { scope: ["email"] })(req, res);
};

const checkProvider = (provider) => {
  if (!["google", "facebook"].includes(provider)) {
    return false;
  }

  return true;
};

const callback = asyncHandler(async (req, res) => {
  const { provider } = req.params;

  const validProvider = checkProvider(provider);

  if (!validProvider) {
    return res.status(400).json({
      message: "Not found",
    });
  }

  passport.authenticate(provider, { session: false }, async (err, user) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const email = user.emails[0].value;

    const isLogin = await socialiteService(email);
    const accessToken = generateAccessToken(isLogin._id);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.status(isLogin ? 200 : 400).json({
      message: isLogin ? "Login success" : "Fail to login",
      data: isLogin ?? [],
    });
  })(req, res);
});

module.exports = {
  redirect: redirect,
  callback: callback,
};
