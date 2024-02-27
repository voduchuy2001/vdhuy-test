const express = require("express");
const initAPIRoutes = require("./routes/api");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const corsMiddleware = require("./middlewares/Cors");
const loggerMiddleware = require("./middlewares/Logger");
const notFoundMiddleware = require("./middlewares/NotFound");
const limiterMiddleware = require("./middlewares/RateLimiter");
const serveStaticFiles = require("./middlewares/StaticFiles");
const { cleanupFiles } = require("./config/cron");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsMiddleware);
serveStaticFiles(app);
app.use(loggerMiddleware);
app.use(limiterMiddleware);
initAPIRoutes(app);
app.use(notFoundMiddleware);
cleanupFiles();

const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log("[http://localhost:" + port + "]");
});
