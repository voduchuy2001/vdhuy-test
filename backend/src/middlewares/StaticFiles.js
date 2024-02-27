const express = require("express");
const path = require("path");
const fs = require("fs");

const imagesFolderPath = path.join(__dirname, "../storage/images");

if (!fs.existsSync(imagesFolderPath)) {
  fs.mkdirSync(imagesFolderPath, { recursive: true });
}

const serveStaticFiles = (app) => {
  app.use("/images", express.static(imagesFolderPath));
};

module.exports = serveStaticFiles;
