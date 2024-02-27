const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const logDirectory = path.join(__dirname, "../storage/logs");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "express.log"),
  { flags: "a" }
);

const loggerMiddleware = morgan("combined", { stream: accessLogStream });

module.exports = loggerMiddleware;
