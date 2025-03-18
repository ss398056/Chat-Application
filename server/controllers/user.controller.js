import User from "../models/user.js";
import { asyncHandler } from "../utilities/async.handler.js";
import { errorHandler } from "../utilities/error.handler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Here we create all required and api methods

export const register = asyncHandler(async (req, res, next) => {
  const { fullName, username, gender, password } = req.body;

  if (!fullName || !username || !gender || !password) {
    return next(new errorHandler("All fields are required.", 400));
  }
  const user = await User.findOne({ username });
  if (user) {
    return next(new errorHandler("User already exists with this username "+username, 409));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const avatarType = gender.toLowerCase() === "male" ? "boy" : "girl";
  const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;
  const newUser = await User.create({
    username,
    fullName,
    password: hashedPassword,
    gender,
    avatar,
  });
  const tokenData = { _id: newUser?._id, username: newUser?.username };
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  return res
    .status(200)
    .cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //7days expire
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "Register a user successfully.",
      error: false,
      data: newUser,
      jwt: token,
    });
});

export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new errorHandler("All fields are required.", 400));
  }
  const user = await User.findOne({ username });
  if (!user) {
    return next(
      new errorHandler("Please enter a valid username and password", 400)
    );
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return next(
      new errorHandler("Please enter a valid username and password", 400)
    );
  }
  const tokenData = { _id: user?._id, username: user?.username };
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  return res
    .status(200)
    .cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //7days expire
      httpOnly: true,
      secure: false,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "login a user successfully.",
      error: false,
      user,
      jwt : token
    });
});



export const getProfile = asyncHandler(async (req, res, next) => {
  const _id = req.userId;
  const user = await User.findOne({_id});
  if (!user) {
    return next(
      new errorHandler("Invalid jwt token", 400)
    );
  }
  //console.log(user)
  return res.status(200).json({
    success: true,
    message: "Found a user successfully.",
    error: false,
    profile: user,
  });
});


export const logout = asyncHandler(async (req, res, next) => {
  
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
  });

  return res.status(200).json({
    success: true,
    message: "User logout successfully.",
    error: false,
  });
});

export const getOtherUsers = asyncHandler(async (req, res, next) => {
  const _id = req.userId;
  
  const users = await User.find({_id: {$ne: _id}});

  return res.status(200).json({
    success: true,
    message: "Found some ther users successfully",
    error: false,
    users: users,
  });
});