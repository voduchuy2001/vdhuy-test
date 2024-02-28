import asyncHanler from "express-async-handler";
import oAuth2Client from "../../config/google";
import socialiteCallbackService from "../../services/auth/SocialiteService";
import { generateAccessToken } from "../../utils/GenerateToken";

const redirect = asyncHanler(async (req, res) => {
  const isGenerated = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "email",
  });

  return res.status(isGenerated ? 200 : 400).json({
    message: isGenerated ? "URL" : "Fail to generate",
    data: isGenerated ?? [],
  });
});

const callback = asyncHanler(async (req, res) => {
  const code = req.query.code;
  const isLogin = await socialiteCallbackService(code, oAuth2Client);

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
  redirect: redirect,
  callback: callback,
};
