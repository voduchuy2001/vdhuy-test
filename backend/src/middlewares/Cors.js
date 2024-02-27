const cors = require("cors");
require("dotenv").config();

const corsOptions = {
  origin: process.env.URL_CLIENT,
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
