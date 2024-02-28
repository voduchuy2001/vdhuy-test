import asyncHandler from "express-async-handler";
import db from "../../models/index";
import userDto from "../../dto/userDto";

const socialiteCallbackService = asyncHandler(async (code, oAuth2Client) => {
  const tokenResponse = await oAuth2Client.getToken(code);
  const idToken = tokenResponse.tokens.id_token;
  const ticket = await oAuth2Client.verifyIdToken({
    idToken: idToken,
  });
  const user = ticket.getPayload();
  const { email } = user;

  let account = await db.User.findOne({ where: { email: email } });

  if (!account) {
    account = await db.User.create({
      email: email,
    });
  }

  return userDto(account);
});

module.exports = socialiteCallbackService;
