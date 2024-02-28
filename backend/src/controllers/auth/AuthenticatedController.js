import asyncHandle from "express-async-handler";
import { authenticatedService } from "../../services/auth/AuthenticatedService";

const authenticated = asyncHandle(async (req, res) => {
  const { id } = req.user;

  const isAuthenticated = await authenticatedService(id);

  return res.status(isAuthenticated ? 200 : 400).json({
    message: isAuthenticated
      ? "User information"
      : "Fail to get user information",
    data: isAuthenticated ?? [],
  });
});

module.exports = {
  authenticated: authenticated,
};
