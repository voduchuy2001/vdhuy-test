const { OAuth2Client } = require("google-auth-library");
const { GOOGLE } = require("./services");

const oAuth2Client = new OAuth2Client(
  GOOGLE.clientID,
  GOOGLE.clientSecret,
  GOOGLE.callbackURL
);

module.exports = oAuth2Client;
