import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "user is not authenticated",
    });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("err -->", err);
    return res.status(401).json({
      success: false,
      message: "user is not authenticated",
    });
  }
}

export async function authArtist(req, res, next) {
  if (req.user.userType !== "artist") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Only artists can perform this action.",
    });
  }
  next();
}
