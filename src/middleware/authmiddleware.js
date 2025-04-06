import jwt from "jsonwebtoken";
import Users from "../DB/model/User.model.js";

// Middleware to verify JWT token
export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from header

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token

    // Get user from token using _id (not id)
    const user = await Users.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Middleware to check if user is Admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role && req.user.role.toLowerCase() === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Access denied, admin only",
      currentRole: req.user?.role || "no role", // This helps in debugging
    });
  }
};
