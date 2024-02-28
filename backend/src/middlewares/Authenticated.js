import asyncHandler from "express-async-handler";
const jwt = require("jsonwebtoken");
import db from "../models/index";

const authenticated = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

const isAdmin = asyncHandler(async (req, res, next) => {
  const id = req.user.id;

  const user = await db.User.findOne({ where: { id: id, role: "ADMIN" } });

  if (!user) {
    return res.status(401).json({
      message: "Access denied",
    });
  }

  next();
});

module.exports = {
  authenticated: authenticated,
  isAdmin: isAdmin,
};
