import jwt from "jsonwebtoken";
import Users from "../DB/model/User.model.js";

// Middleware to verify JWT token
export const protect = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized, no token provided",
        error: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token provided",
        error: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const user = await Users.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        error: "User not found",
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
        error: "Invalid token",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired",
        error: "Token expired",
      });
    }
    return res.status(401).json({
      message: "Not authorized",
      error: error.message,
    });
  }
};

// Middleware to check if user is Admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role && req.user.role.toLowerCase() === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Access denied, admin only",
      currentRole: req.user?.role || "no role",
    });
  }
};
