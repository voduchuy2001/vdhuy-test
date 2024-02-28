const cors = require("cors");
require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
