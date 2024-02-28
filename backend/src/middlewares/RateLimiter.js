const { rateLimit } = require("express-rate-limit");

const limiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  message: "Too many requests from this IP, please try again later.",
});

module.exports = limiterMiddleware;
