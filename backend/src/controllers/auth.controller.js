import jwt from "jsonwebtoken";
import userModel from "../models/user.models.js";
import crypto from "crypto";
import { config } from "../config/config.js";

export async function register(req, res) {
  const { name, email, password, userType } = req.body;
  if (!name || !email || !password || !userType) {
    return res.status(400).json({
      success: false,
      message: "All fields is required",
    });
  }
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }
  const hashedPassword = await crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
    userType,
  });
  const token = jwt.sign(
    { id: newUser._id, userType: newUser.userType },
    config.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
  });
  res.status(201).json({
    success: true,
    message: "user created successfully",
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields is required",
    });
  }
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "email is not registered",
    });
  }
  const hashedPassword = await crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  if (user.password !== hashedPassword) {
    return res.status(400).json({
      success: false,
      message: "password is incorrect",
    });
  }

  const token = jwt.sign(
    { id: user._id, userType: user.userType },
    config.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "user logged in successfully",
  });
}

export async function logout(req, res) {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "user logged out successfully",
  });
}

export async function getMe(req, res) {
  const user = await userModel.findById(req.user.id).select("-password");
  res.status(200).json({
    success: true,
    message: "user fetched successfully",
    user,
  });
}
