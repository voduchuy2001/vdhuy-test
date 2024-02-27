const passport = require("passport");
const { GOOGLE, FACEBOOK } = require("./services");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK.clientID,
      clientSecret: FACEBOOK.clientSecret,
      callbackURL: FACEBOOK.callbackURL,
      profileFields: ["id", "displayName", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE.clientID,
      clientSecret: GOOGLE.clientSecret,
      callbackURL: GOOGLE.callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

module.exports = passport;
