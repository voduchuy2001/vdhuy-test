const express = require("express");
const initAPIRoutes = require("./routes/api");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const corsMiddleware = require("./middlewares/Cors");
const loggerMiddleware = require("./middlewares/Logger");
const notFoundMiddleware = require("./middlewares/NotFound");
const serveStaticFiles = require("./middlewares/StaticFiles");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsMiddleware);
serveStaticFiles(app);
app.use(loggerMiddleware);
initAPIRoutes(app);
app.use(notFoundMiddleware);

const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log("[http://localhost:" + port + "]");
});
