const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateAccessToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: "3d",
  });

  return token;
};

const generateToken = (byteLength = 32) => {
  return crypto.randomBytes(byteLength).toString("hex");
};

const generateVerifyToken = () => {
  return generateToken();
};

const generateResetPasswordToken = () => {
  return generateToken();
};

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const hashVerifyToken = (token) => {
  return hashToken(token);
};

const hashResetPasswordToken = (token) => {
  return hashToken(token);
};

module.exports = {
  generateAccessToken: generateAccessToken,
  generateVerifyToken: generateVerifyToken,
  hashVerifyToken: hashVerifyToken,
  hashResetPasswordToken: hashResetPasswordToken,
  generateResetPasswordToken: generateResetPasswordToken,
};
