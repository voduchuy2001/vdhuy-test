const express = require("express");
const http = require("http");
const initAPIRoutes = require("./routes/api");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const corsMiddleware = require("./middlewares/Cors");
const loggerMiddleware = require("./middlewares/Logger");
const notFoundMiddleware = require("./middlewares/NotFound");
const serveStaticFiles = require("./middlewares/StaticFiles");
const configureSocket = require("./config/socket");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = configureSocket(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsMiddleware);
serveStaticFiles(app);
app.use(loggerMiddleware);
initAPIRoutes(app);
app.use(notFoundMiddleware);
app.set("io", io);

const port = process.env.PORT || 6969;
server.listen(port, () => {
  console.log("[http://localhost:" + port + "]");
});
